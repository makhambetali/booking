# Используем официальный базовый образ Python
FROM python

# Устанавливаем переменные окружения
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Указываем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Копируем requirements.txt (если есть)
COPY requirements.txt /app/

# Устанавливаем зависимости Python
RUN pip install --no-cache-dir -r requirements.txt

# Копируем проект в контейнер
COPY . /app/
EXPOSE 8001
# Указываем команду для запуска приложения
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
