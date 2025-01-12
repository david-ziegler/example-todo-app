import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./shadcn-ui/Alert";

type Props = {
  error: Error;
  message: string;
};

export function ErrorAlert({ error, message }: Props) {
  console.error(error);

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Fehler</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
