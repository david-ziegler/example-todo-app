import { z } from "zod";
import { Dialog } from "./shadcn-ui/Dialog";
import { useForm } from "react-hook-form";
import { createTodoSchema, TodoCreate } from "../types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./shadcn-ui/Button";
import { Input } from "./shadcn-ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import { Select } from "@radix-ui/react-select";
import { FormField } from "./form/FormField";
import { ResponsibleSelect } from "./form/ResponsibleSelect";
import { TodoWithResponsible } from "../types/todoWithResponsible";
import { fetchPersons } from "../api/persons";
import { Person } from "../types/person";

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
  const {
    data: persons,
    isPending,
    isError,
    error,
  } = useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: fetchPersons,
  });

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
    control,
    formState: { errors },
  } = useForm<TodoCreate>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = (data: TodoCreate): void => {
    console.log("data", data);
    // mutation.mutate(data);
  };

  const handleCancelClick = () => {
    reset();
    onCancelClick();
  };

  return (
    <Dialog open={open} title="Neue Aufgabe">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField name="label" label="Beschreibung" errors={errors}>
            <Input id="label" {...register("label")} />
          </FormField>
          <FormField name="responsible" label="Verantwortlich" errors={errors}>
            <ResponsibleSelect persons={persons} control={control} />
          </FormField>
        </div>
        <div className="flex flex-row justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancelClick}>
            Abbrechen
          </Button>
          <Button type="submit">
            {mutation.isPending ? "laden..." : "Speichern"}
            {/* TODO: loading */}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
