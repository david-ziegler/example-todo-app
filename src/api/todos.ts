import env from "../helpers/env";
import { Person } from "../types/person";
import { Todo, TodoCreate, TodoEdit } from "../types/todo";
import {
  isTodoWithResponsible,
  TodoWithResponsible,
} from "../types/todoWithResponsible";
import { fetchPersons } from "./persons";

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${env.VITE_TODO_API_URL}/todos?_limit=7`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error while trying to fetch todos");
  }
  return response.json();
}

export async function fetchTodosWithResponsibles() {
  const [todos, persons] = await Promise.all([fetchTodos(), fetchPersons()]);

  const personsMap = new Map<number, Person>(
    persons.map((person: Person) => [person.id, person])
  );

  const todosWithResponsibles: TodoWithResponsible[] = todos.map(
    (todo: Todo) => {
      const todoWithResponsible = {
        ...todo,
        responsiblePerson: personsMap.get(todo.responsible),
      };

      if (!isTodoWithResponsible(todoWithResponsible)) {
        throw new Error(`Type of a todoWithResponsible object is wrong`);
      }

      return todoWithResponsible;
    }
  );

  return todosWithResponsibles;
}

export async function createTodo(data: TodoCreate): Promise<TodoCreate> {
  const response = await fetch(`${env.VITE_TODO_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error while trying to create a todo");
  }

  return await response.json();
}

export async function editTodo(data: TodoEdit): Promise<TodoCreate> {
  const response = await fetch(`${env.VITE_TODO_API_URL}/todos/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error while trying to update a todo");
  }

  return await response.json();
}
