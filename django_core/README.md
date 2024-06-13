# ___Django___
![PyPI - Version](https://img.shields.io/pypi/v/Django?label=django)
![PyPI - Version](https://img.shields.io/pypi/v/djangorestframework?label=DRF)
___
## Краткое описание:

#### Для входа  в админ панель нажмите [сюда](http://localhost:8000/admin/login/?next=/admin/).

  >___username___ - django-root
 
  >___password___ - 12345
___
# Для тестеров (авто-тесты)
  + Клонирование проекта
```
git clone https://github.com/iMWC-IXIVI/zooj.git
```
  + Переход в нужную директорию 
```
cd zooj
```
  + Создание виртуальное окружения
```
python -m venv venv
```
  + Далее необходимо выбрать интерпретатор виртуального окружения и активировать виртуальное окружение
   > Если IDE - PyCharm:
   >> + Папка виртуального окружения => папка Scripts => копируем абсолютный путь до файла python.exe
   >> + В правом нижнем углу нажимаем на интерпретатор;
   >> + Add New Interpreter
   >> + Add Local interpreter
   >> + Existing
   >> + Вставляем ранее скопированный путь до файла python.exe виртуального окружения

  + Перейти в папку с django проектом
```
cd django_core
```
  + Установка зависимостей
```
pip install -r req.txt
```
  + Включить доккер => открыть новое окно в терминале => провалиться в директорию 'zooj' => прописать следующую команду
```
docker compose up django-postgres --build
```
  + Далее в директории django_core создать файл .env и перенести в него данные:
``` python
SECRET_KEY="django-insecure-$k_&c=km8%4j9bb77)9=z=@joju6_bg)9hg$x6e4%(0&0tkz*r"

DEBUG="True"

NAME="django"
USER="django"
PASSWORD="django"
HOST="localhost"
PORT="5432"
```
### Всё, базовая настройка проекта для локальных тестов готова.

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
# API
___
## /api/send-mail/

  > method POST принимает почту пользователя, на которую будет отправлен код, т.е почта должна быть реальная.

Пример входных данных при тестировании:

```json
{
  "email": "zooj@yandex.ru"
}
```

В случае успеха такой ответ:

```json
{
  "message": "success"
}
```

По негативному сценарию:

```
{"detail": "user doest uuid"}
{"detail": "field email doest found"}
{"detail": "data is bad"}
```

cURL:

```
curl --location 'http://localhost/api/send-mail/' \
--header 'anonymous-uuid: 8b038105-b926-4e11-9ada-39e792a2e8c3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "zooj@yandex.ru"
}'
```

## api/registration/

  > method POST принимает 4-х значный код, который был отправлен на почту пользователя.
  
Пример входных данных при тестировании:

```json
{
   "code": "0000"
}
```
В случае успеха возвращается токен:

```
{"token: cdxtyuyjhujHCFRFyiuhijkjhgtufyighuijpujhuig"}
```
Ответ по негативному сценарию:
```
{"detail": "authorization error"}
```

  > cURL:
  > ```
  > curl --location 'http://127.0.0.1:8000/api/registration/' \
  > --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.6tU0R7pBxmrH5_AZzjUUyfLJkIXrG-i7kUUe3HSB80o' \
  > --header 'Content-Type: application/json' \
  > --data '{
  > "code": "0000"
  > }'
  > ```

## api/get-user/

  > method GET озвращает профиль пользователя

  >cURL:
  > ```
  > curl --location 'http://127.0.0.1:8000/api/get-user/' \
  > --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.6tU0R7pBxmrH5_AZzjUUyfLJkIXrG-i7kUUe3HSB80o' \
  > --data ''```
  
  > method PUT вносит изменения в профиль пользователя
  
Пример входных данных при тестировании:
 
```json
{
    "email": "es1@es1.ru",
    "username": "es1",
    "phone": "8908676879",
    "address": "Russia",
    "birthday": "12.12"
}
```

В случае успеха такой ответ:

```json
{
  "message": "success"
}
```

Ответ по негативному сценарию:

```
{"detail": "data is bad"}
{"detail": "authorization error"}
```


  > cURL:
  > ```
  > curl --location --request PUT 'http://127.0.0.1:8000/api/get-user/' \
  > --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.6tU0R7pBxmrH5_AZzjUUyfLJkIXrG-i7kUUe3HSB80o' \
  > --data ''
  >```

  > method DELETE удаляет пользователя из бд, т.е удаляет аккаунт
  
В случае успеха такой ответ:

```json
{
  "message": "success"
}
```

Ответ по негативному сценарию:
```
{"detail": "authorization error"}
```

  > cURL:
  > ```
  > curl --location --request DELETE 'http://127.0.0.1:8000/api/get-user/' \
  > --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.6tU0R7pBxmrH5_AZzjUUyfLJkIXrG-i7kUUe3HSB80o' \
  > --data ''
  > ```