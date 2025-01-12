import env from "../helpers/env";
import { Person } from "../types/person";
import { Todo } from "../types/todo";
import {
  isTodoWithResponsible,
  TodoWithResponsible,
} from "../types/todoWithResponsible";

async function fetchTodos(): Promise<Todo[]> {
  const todosResult = await fetch(`${env.VITE_TODO_API_URL}/todos`);
  if (!todosResult.ok) {
    throw new Error("Error while trying to fetch todos");
  }
  return todosResult.json();
}

async function fetchPersons(): Promise<Person[]> {
  const personsResult = await fetch(`${env.VITE_TODO_API_URL}/persons`);
  if (!personsResult.ok) {
    throw new Error("Error while trying to fetch persons");
  }
  return personsResult.json();
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
        responsible: undefined,
      };

      if (!isTodoWithResponsible(todoWithResponsible)) {
        throw new Error(`Type of a todoWithResponsible object is wrong`);
      }

      return todoWithResponsible;
    }
  );

  return todosWithResponsibles;
}
