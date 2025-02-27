@echo off
echo Starting Django server

:: Переход в папку с проектом
cd backend

:: Активация виртуального окружения (если используется)
call venv\Scripts\activate

:: Запуск сервера
python manage.py runserver

:: Ожидание завершения работы
pause
