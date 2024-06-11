FROM python:3.12-alpine


WORKDIR /django-core
COPY req.txt /django-core/req.txt
COPY .env.docker /django-core/.env.docker
RUN pip install -r req.txt

COPY . /django-core/

CMD python manage.py migrate \
    && python manage.py runserver 0.0.0.0:8000