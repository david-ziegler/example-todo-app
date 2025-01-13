import env from "../helpers/env";
import { Person } from "../types/person";

export async function fetchPersons(): Promise<Person[]> {
  const response = await fetch(`${env.VITE_TODO_API_URL}/persons`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error while trying to fetch persons");
  }
  return response.json();
}
