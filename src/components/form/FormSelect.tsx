import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/Select";
import { LoaderCircleIcon } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

type Props<FormData extends FieldValues> = {
  name: Path<FormData>;
  options: SelectOption[] | undefined;
  control: Control<FormData, any>;
  transformValue: (value: string) => string | number | boolean;
};

export function FormSelect<FormData extends FieldValues>({
  name,
  options,
  control,
  transformValue,
}: Props<FormData>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ShadcnSelect
          onValueChange={(value: string) =>
            field.onChange(transformValue(value))
          }
          value={field.value?.toString()}
        >
          <SelectTrigger id={name}>
            <SelectValue placeholder="Bitte wählen" />
          </SelectTrigger>
          <SelectContent>
            {!options ? (
              <div className="flex justify-center">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </ShadcnSelect>
      )}
    />
  );
}
