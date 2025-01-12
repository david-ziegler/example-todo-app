import { Control, Controller } from "react-hook-form";
import { Person } from "../../types/person";
import { TodoCreate } from "../../types/todo";
import { LoaderCircleIcon } from "lucide-react";
import { Select } from "./Select";

type Props = {
  persons: Person[] | undefined;
  control: Control<TodoCreate, any>;
};

export function SelectResponsible({ persons, control }: Props) {
  return (
    <Select
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
