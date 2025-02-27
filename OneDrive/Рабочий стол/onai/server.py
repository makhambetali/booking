from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl, ValidationError
import requests
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os
from dotenv import load_dotenv
import logging

# Загружаем переменные окружения из .env файла
load_dotenv()

app = FastAPI()

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WebhookRequest(BaseModel):
    message: str
    callback_url: HttpUrl

# Настройка подключения к MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["chatbot_database"]
collection = db["chat_history"]

OPENROUTER_TOKEN = os.getenv("OPENROUTER_TOKEN")
LLM_URL = "https://openrouter.ai/api/v1/chat/completions"

async def call_llm(messages: List[dict]):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "openai/gpt-3.5-turbo-16k",
        "messages": messages
    }
    response = requests.post(LLM_URL, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        logger.error(f"Failed to get response from LLM: {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to get response from LLM")

async def send_callback(callback_url: str, response_content: str):
    headers = {"Content-Type": "application/json"}
    data = {"response": response_content}
    await asyncio.to_thread(requests.post, callback_url, headers=headers, data=json.dumps(data))

async def get_chat_history(callback_url: str):
    history = await collection.find({"callback_url": callback_url}).sort("timestamp", 1).to_list(length=100)
    return [{"role": item["role"], "content": item["content"]} for item in history]

async def save_message(callback_url: str, role: str, content: str):
    message = {
        "callback_url": callback_url,
        "role": role,
        "content": content,
        "timestamp": asyncio.get_event_loop().time()
    }
    await collection.insert_one(message)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = client
    app.mongodb = db
    logger.info("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

@app.get("/")
async def root():
    return {"message": "API is running. Use POST /webhook to send messages."}

@app.post("/webhook")
async def webhook(request: WebhookRequest):
    try:
        logger.info(f"Received webhook request: {request.dict()}")
        
        history = await get_chat_history(request.callback_url)
        
        user_message = {"role": "user", "content": request.message}
        history.append(user_message)
        await save_message(request.callback_url, "user", request.message)
        
        response_content = await call_llm(history)
        
        await save_message(request.callback_url, "assistant", response_content)
        
        await send_callback(request.callback_url, response_content)

        logger.info("Response sent to callback URL")
        return {"status": "success", "message": "Response sent to callback URL"}
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=422, detail="Invalid input data")
    except Exception as e:
        logger.error(f"Internal server error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
