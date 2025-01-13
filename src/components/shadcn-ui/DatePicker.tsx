import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { de } from "date-fns/locale";

type Props = {
  value: Date | undefined;
  setValue: (value: Date | undefined) => void;
};

export function DatePicker({ value, setValue }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? <span>{format(value, "PPP", { locale: de })}</span> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={setValue}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
