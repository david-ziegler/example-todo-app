import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "../shadcn-ui/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type Props<FormData extends FieldValues> = {
  name: Path<FormData>;
  control: Control<FormData, any>;
};

export function FormDatePicker<FormData extends FieldValues>({
  name,
  control,
}: Props<FormData>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const date = field.value ? dayjs(field.value, "DD.MM.YYYY") : undefined;
        return (
          <DatePicker
            value={date?.toDate()}
            setValue={(value: Date | undefined) => {
              const formatted = dayjs(value).format("DD.MM.YYYY");
              field.onChange(formatted);
            }}
          />
        );
      }}
    />
  );
}
