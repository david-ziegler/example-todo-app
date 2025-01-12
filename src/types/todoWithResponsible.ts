import { isPerson, Person } from "./person";

export type TodoWithResponsible = {
  id: number;
  label: string;
  responsiblePerson: Person;
  dueDate: string; // "DD.MM.YYYY"
  done: boolean;
};

export function isTodoWithResponsible(
  obj: unknown
): obj is TodoWithResponsible {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const todo = obj as Partial<TodoWithResponsible>;

  return (
    typeof todo.id === "number" &&
    typeof todo.label === "string" &&
    isPerson(todo.responsiblePerson) &&
    typeof todo.dueDate === "string" &&
    typeof todo.done === "boolean"
  );
}
