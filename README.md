# ToDo App

## Run the frontend

```
npm install
npm start
```

## Run the backend

Run the following command to run the backend:

```
node server.js
```

There are two APIs:

- `http://localhost:3004/todos`
- `http://localhost:3004/persons`

They have the following endpoints:

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

## Don't track changes to `db.json`

If you don't want git to track changes to the `db.json` file, run the following command:

```
git update-index --assume-unchanged db.json
```

We didn't add it to gitignore because an initial `db.json` file with some initial data (e.g. persons) is required for the app to work.
