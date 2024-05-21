# Database migrations

## Create migration
Run in ./migrations folder:
```
goose create name
```

## Run test db migrations
```
goose postgres "user=maxim password=maxim sslmode=disable dbname=auth_test" up
```

## Run dev db migrations
```
goose postgres "user=maxim password=maxim sslmode=disable dbname=auth_dev" up
```

# Requests

## Login
```
curl -X POST "http://localhost:8080/login" -d '{"email": "test@email.com", "password": "password"}' -H "Content-Type: application/json"
```
check login
```
curl -X GET "http://localhost:1111/api/users" -H "Authentication: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU3NDY4NDEsImp0aSI6IjYifQ.-xr0PWqs5hdAJF3NrVEZXcIlW59C6InTVSZwkydeBDs"
```