# Этап сборки зависимостей
FROM python:3.12-alpine AS builder

WORKDIR /django-core

# Копируем файлы зависимостей и устанавливаем их
COPY req.txt .
RUN pip install --prefix=/install -r req.txt

# Основной этап
FROM python:3.12-alpine

WORKDIR /django-core

# Копируем установленные зависимости из предыдущего этапа
COPY --from=builder /install /usr/local

# Копируем все файлы из текущей директории в контейнер
COPY . .

# Выполняем миграции базы данных Django и создаем суперпользователя
CMD python manage.py migrate && \
    python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='django-root').exists() or User.objects.create_superuser(username='django-root', password='12345', email='root@me.com')" && \
    python manage.py runserver 0.0.0.0:8000
