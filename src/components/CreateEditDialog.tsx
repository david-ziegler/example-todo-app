import { Dialog } from "./shadcn-ui/Dialog";
import { useForm } from "react-hook-form";
import { createEditTodoSchema, TodoCreate } from "../types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./shadcn-ui/Button";
import { Input } from "./shadcn-ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, editTodo } from "../api/todos";
import { FormField } from "./form/FormField";
import { SelectResponsible } from "./form/SelectResponsible";
import { fetchPersons } from "../api/persons";
import { Person } from "../types/person";
import { SelectDone } from "./form/SelectDone";
import { FormDatePicker } from "./form/FormDatePicker";
import { useDialog } from "./context/useDialog";
import { TodoWithResponsible } from "../types/todoWithResponsible";
import { useState } from "react";

export function CreateEditDialog() {
  const queryClient = useQueryClient();
  const { dialog, closeDialog } = useDialog();

  const [errorMessage, setErrorMessage] = useState("");

  const { data: persons } = useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: fetchPersons,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      closeDialog();
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      closeDialog();
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
    },
  });

  let todo: TodoWithResponsible | undefined;
  if (dialog?.type === "edit") {
    const todos = queryClient.getQueryData<TodoWithResponsible[]>(["todos"]);
    todo = todos?.find(
      (todo: TodoWithResponsible) => todo.id === dialog.todoId
    );
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TodoCreate>({
    resolver: zodResolver(createEditTodoSchema),
    defaultValues: {
      label: todo?.label,
      responsible: todo?.responsiblePerson.id,
      dueDate: todo?.dueDate,
      done: todo?.done,
    },
  });

  const onSubmit = (data: TodoCreate): void => {
    if (dialog?.type === "create") {
      createMutation.mutate(data);
    } else {
      if (!todo) {
        setErrorMessage("Zu bearbeitende Aufgabe konnte nicht geladen werden.");
        return;
      }
      editMutation.mutate({ ...data, id: todo.id });
    }
  };

  const handleCancelClick = () => {
    reset();
    closeDialog();
  };

  return (
    <Dialog open={dialog !== undefined} title="Neue Aufgabe">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField name="label" label="Beschreibung" errors={errors}>
            <Input id="label" {...register("label")} />
          </FormField>
          <FormField name="responsible" label="Verantwortlich" errors={errors}>
            <SelectResponsible persons={persons} control={control} />
          </FormField>
          <FormField name="dueDate" label="Fälligkeit" errors={errors}>
            <FormDatePicker name="dueDate" control={control} />
          </FormField>
          <FormField name="done" label="Status" errors={errors}>
            <SelectDone control={control} />
          </FormField>
        </div>
        {errorMessage && (
          <p className="text-destructive pt-6">{errorMessage}</p>
        )}
        <div className="flex flex-row justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancelClick}>
            Abbrechen
          </Button>
          <Button
            type="submit"
            disabled={createMutation.isPending || errorMessage.length > 0}
          >
            Speichern
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
