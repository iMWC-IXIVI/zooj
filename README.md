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
