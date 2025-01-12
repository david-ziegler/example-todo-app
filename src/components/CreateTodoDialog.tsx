import { z } from "zod";
import { Dialog } from "./shadcn-ui/Dialog";
import { useForm } from "react-hook-form";
import { createTodoSchema, TodoCreate } from "../types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./shadcn-ui/Button";
import { Input } from "./shadcn-ui/Input";
import { FormField } from "./FormField";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

type Props = {
  open: boolean;
  onCancelClick: () => void;
  onSaveClick: () => void;
};

export function CreateTodoDialog({
  open,
  onCancelClick,
  onSaveClick,
}: Props): JSX.Element {
  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      onSaveClick();
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoCreate>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = (data: TodoCreate): void => {
    console.log("data", data);
    mutation.mutate(data);
  };

  const handleCancelClick = () => {
    reset();
    onCancelClick();
  };

  return (
    <Dialog open={open} title="Neue Aufgabe">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField name="label" label="Beschreibung" errors={errors}>
          <Input id="label" {...register("label")} />
        </FormField>
        <div className="flex flex-row justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancelClick}>
            Abbrechen
          </Button>
          <Button type="submit">
            {mutation.isPending ? "laden..." : "Speichern"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
