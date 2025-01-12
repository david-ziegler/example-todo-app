export type Person = {
  id: number;
  name: string;
  email: string;
};

export function isPerson(obj: unknown): obj is Person {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const person = obj as Partial<Person>;

  return (
    typeof person.id === "number" &&
    typeof person.name === "string" &&
    typeof person.email === "string"
  );
}
