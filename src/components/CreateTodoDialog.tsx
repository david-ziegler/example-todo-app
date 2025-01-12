import { Dialog } from "./shadcn-ui/Dialog";
import { useForm } from "react-hook-form";
import { createTodoSchema, TodoCreate } from "../types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./shadcn-ui/Button";
import { Input } from "./shadcn-ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import { FormField } from "./form/FormField";
import { SelectResponsible } from "./form/SelectResponsible";
import { fetchPersons } from "../api/persons";
import { Person } from "../types/person";
import { SelectDone } from "./form/SelectDone";
import { DatePicker } from "./shadcn-ui/DatePicker";
import { FormDatePicker } from "./form/FormDatePicker";

type Props = {
  open: boolean;
  closeDialog: () => void;
};

export function CreateTodoDialog({ open, closeDialog }: Props): JSX.Element {
  const { data: persons } = useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: fetchPersons,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      closeDialog();
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
    mutation.mutate(data);
  };

  const handleCancelClick = () => {
    reset();
    closeDialog();
  };

  return (
    <Dialog open={open} title="Neue Aufgabe">
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
        <div className="flex flex-row justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={handleCancelClick}>
            Abbrechen
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            Speichern
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
