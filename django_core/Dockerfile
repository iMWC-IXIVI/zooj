FROM python:3.12-alpine

WORKDIR /django-core
COPY . /django-core/

RUN pip install -r req.txt

CMD python manage.py migrate \
    && python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='django-root').exists() or User.objects.create_superuser(username='django-root', password='12345', email='root@me.com')" \
    && python manage.py runserver 0.0.0.0:8000