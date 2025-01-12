import { PropsWithChildren } from "react";
import { cn } from "./utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";

// This component is not from shadcn/ui but self-written in order to avoid dependencies,
// still this seemed the best folder to put it

type Props = {
  open: boolean;
  title: string;
};

export function Dialog({ open, title, children }: PropsWithChildren<Props>) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
