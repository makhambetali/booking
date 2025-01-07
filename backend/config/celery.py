from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Установите настройки Django по умолчанию
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')

# Загрузите настройки из settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматически ищите задачи в installed apps
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
