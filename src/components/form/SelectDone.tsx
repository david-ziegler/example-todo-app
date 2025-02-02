import { Control } from "react-hook-form";
import { TodoCreate } from "../../types/todo";
import { FormSelect } from "./FormSelect";

type Props = {
  control: Control<TodoCreate, any>;
};

const options = [
  {
    value: "false", // @radix-ui/react-select only allows strings, we transform it back to boolean when selecting the value (see `transformValue` below)
    label: "Offen",
  },
  {
    value: "true",
    label: "Erledigt",
  },
];

export function SelectDone({ control }: Props) {
  return (
    <FormSelect
      name="done"
      options={options}
      control={control}
      transformValue={(value: string) => value === "true"}
    />
  );
}
