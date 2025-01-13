import { Control } from "react-hook-form";
import { Person } from "../../types/person";
import { TodoCreate } from "../../types/todo";
import { FormSelect } from "./FormSelect";

type Props = {
  persons: Person[] | undefined;
  control: Control<TodoCreate, any>;
};

export function SelectResponsible({ persons, control }: Props) {
  return (
    <FormSelect
      name="responsible"
      options={persons?.map((person) => ({
        value: person.id.toString(),
        label: person.name,
      }))}
      control={control}
      transformValue={(value: string) => Number(value)}
    />
  );
}
