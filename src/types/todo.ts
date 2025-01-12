import { z } from "zod";

export type Todo = {
  id: number;
  label: string;
  responsible: number;
  dueDate: string; // "DD.MM.YYYY"
  done: boolean;
};

export const createTodoSchema = z.object({
  label: z.string().min(1, "Bitte gib eine Beschreibung ein"),
  responsible: z.number({
    required_error: "Bitte wähle eine verantwortliche Person aus",
  }),
  done: z.boolean({ required_error: "Bitte wähle einen Status aus" }),
});

export type TodoCreate = z.infer<typeof createTodoSchema>;
