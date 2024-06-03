FROM python:3.12-alpine


WORKDIR /django-core
COPY req.txt /django-core/req.txt
COPY .env.docker /django-core/.env.docker
RUN pip install -r req.txt

COPY . /django-core/

RUN python manage.py makemigrations

CMD python manage.py migrate \
    && python manage.py shell -c "from api.models import CustomUser; CustomUser.objects.filter(email='root@me.com').exists() or CustomUser.objects.create_user(email='root@me.com')" \
    && python manage.py runserver 0.0.0.0:8000