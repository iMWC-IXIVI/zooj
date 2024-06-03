# ___Django___
![PyPI - Version](https://img.shields.io/pypi/v/Django?label=django)
![PyPI - Version](https://img.shields.io/pypi/v/djangorestframework?label=DRF)
___
## Краткое описание:
__Вход в админ панель__ - [Ссылка](http://localhost:8000/admin/login/?next=/admin/).

___username___ - django-root

___password___ - 12345
___
# Для тестеров (авто-тесты)
Клонирование проекта
```
git clone https://github.com/iMWC-IXIVI/zooj.git
```
Переход в нужную директорию 
```
cd zooj
```
Создание виртуальное окружения
```
python -m venv venv
```
Далее необходимо выбрать интерпретатор виртуального окружения и активировать виртуальное окружение

Далее перейти в папку с django проектом
```
cd django_core
```
Далее установка зависимостей
```
pip install -r req.txt
```
Далее, включить доккер, открыть новое окно в терминале провалиться в директорию zooj и прописать команду
```
docker compose up django-postgres --build
```
Далее в директории django_core создать файл .env и перенести в него данные:
```
SECRET_KEY="django-insecure-$k_&c=km8%4j9bb77)9=z=@joju6_bg)9hg$x6e4%(0&0tkz*r"

DEBUG="True"

NAME="django"
USER="django"
PASSWORD="django"
HOST="localhost"
PORT="5432"
```
Всё, базовая настройка проекта для локальных тестов готова.

PS. База данных находится в доккере, поэтому перед тестом включать доккер и запускать контейнер с базой данных

# Для тестов (postman)
Запустить доккер, в терминале провалиться в директорию zooj и прописать команду
```
docker compose up - При первом запуске
docker compose up --build - В случае глобальных изменений во всех контейнеров
```
После перейти по пути указанные в "front/.nginx/nginx.conf"

Соответственно там указаны все пути, которые можно тестировать через postman, начало пути стандартное
```
http://localhost/<дальше пути из nginx>
```
___
# Дальше больше...