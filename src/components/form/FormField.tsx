import { PropsWithChildren } from "react";
import { FieldErrors } from "react-hook-form";
import { TodoCreate } from "../../types/todo";

type Props = {
  name: keyof TodoCreate;
  label: string;
  errors: FieldErrors<TodoCreate>;
};

export function FormField({
  name,
  label,
  errors,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {errors[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
    </div>
  );
}
