import { Control, Controller } from "react-hook-form";
import { Person } from "../../types/person";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/Select";
import { TodoCreate } from "../../types/todo";
import { LoaderCircleIcon } from "lucide-react";

type Props = {
  persons: Person[] | undefined;
  control: Control<TodoCreate, any>;
};

export function ResponsibleSelect({ persons, control }: Props) {
  return (
    <Controller
      name="responsible"
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value: string) => field.onChange(Number(value))}
          value={field.value?.toString()}
        >
          <SelectTrigger id="responsible">
            <SelectValue placeholder="Bitte wählen" />
          </SelectTrigger>
          <SelectContent>
            {!persons ? (
              <div className="flex justify-center">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              persons.map((person) => (
                <SelectItem
                  key={person.id}
                  value={person.id.toString()}
                  className="cursor-pointer"
                >
                  {person.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
    />
  );
}
