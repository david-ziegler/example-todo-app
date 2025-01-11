import env from "../helpers/env";

export async function getTodos() {
  const res = await fetch(`${env.VITE_TODO_API_URL}/todos`);
  if (!res.ok) {
    throw new Error("Error while trying to fetch todos");
  }
  return res.json();
}
