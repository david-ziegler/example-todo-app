import env from "../helpers/env";
import { Person } from "../types/person";

export async function fetchPersons(): Promise<Person[]> {
  const personsResponse = await fetch(`${env.VITE_TODO_API_URL}/persons`);
  if (!personsResponse.ok) {
    throw new Error("Error while trying to fetch persons");
  }
  return personsResponse.json();
}
