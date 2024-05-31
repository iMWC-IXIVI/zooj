FROM python:3.12-alpine


WORKDIR /django-core
COPY req.txt /django-core/req.txt
COPY .env.docker /django-core/.env.docker
RUN pip install -r req.txt

COPY . /django-core/

RUN python manage.py makemigrations

CMD python manage.py migrate \
    && python manage.py shell -c "from api.models import CustomUser; CustomUser.objects.filter(username='django-root').exists() or CustomUser.objects.create_superuser(username='django-root', password='12345', email='root@me.com', phone='8-800-555-35-35')" \
    && python manage.py shell -c "from inform.models import Information; Information.objects.create(user_id='1', gender='М', age='30', weight='70', height='180', activity='Предельная', calorie='3192.0', protein='239.4', fats='106.4', carbohydrates='319.2', target='Набрать вес', allergen='None')" \
    && python manage.py runserver 0.0.0.0:8000