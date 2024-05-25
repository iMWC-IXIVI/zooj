FROM python:3.12-alpine


WORKDIR /django-core
COPY req.txt /django-core/req.txt
RUN pip install -r req.txt

COPY . /django-core/

RUN python manage.py makemigrations

CMD python manage.py migrate \
    && python manage.py shell -c "from api.models import CustomUser; CustomUser.objects.filter(username='django-root').exists() or CustomUser.objects.create_superuser(username='django-root', password='12345', email='root@me.com', phone='8-800-555-35-35')" \
    && python manage.py runserver 0.0.0.0:8000