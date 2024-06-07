# Команда #2

# Запуск Docker Compose

```
docker compose up
```

Контейнеры - postgres, redis, core (go), front (react + nginx)

Принудительный ребилд

```
docker compose up --build
```

Проверка запуска: 
* заходим на http://localhost - должно показать стартовую страницу react-а
* заходим на http://localhost/api/v1/catalog - покажет заглушку - json с 
```
{"message":"hello"}
```
Во время первого запуска возможна ошибка с запуском django приложения, перезагрузка контейнера решает проблему
* заходим на http://localhost:8000/api/django-test/?format=json - покажет заглушку - json c
```
{"Method GET":"Hello from GET"}
```

# Регистрация пользователя
```
curl -X POST -H "Content-Type: application/json" \
    -H "anonymous-uuid: d39fd515-c635-4d09-a2db-165c21e2d5ef" \
    --data '{"email":"mxm.mdz@gmail.com"}' "http://localhost/api/send-mail/" 
```
Полученный токен отправляем:
```
curl -X POST -H "Content-Type: application/json" \
    -H "anonymous-uuid: d39fd515-c635-4d09-a2db-165c21e2d5ef" \
    --data '{"code": "3377"}' "http://localhost/api/registration/"
```