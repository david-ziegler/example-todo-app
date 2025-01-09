## APIs

Um das "Backend" laufen zu lassen: `node server.js`

Es gibt zwei APIs: `http://localhost:3004/todos` und `http://localhost:3004/persons`. Die APIs geben JSON zurück und können auch im Browser aufgerufen werden.

Die APIs haben die folgende Routes:

```
GET    /todos
GET    /todos/1
POST   /todos
PUT    /todos/1
PATCH  /todos/1
DELETE /todos/1
```

```
GET    /persons
GET    /persons/1
POST   /persons
PUT    /persons/1
PATCH  /persons/1
DELETE /persons/1
```
