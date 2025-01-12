import { useQuery } from "@tanstack/react-query";
import { fetchTodosWithResponsibles as fetchTodosWithResponsibles } from "../api/todos";
import { TodoWithResponsible } from "../types/todoWithResponsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./shadcn-ui/Table";
import { LoaderCircleIcon } from "lucide-react";
import { getDoneLabel, getDueDateLabel } from "../helpers/todoLabels";
import { ErrorAlert } from "./ErrorAlert";

export function TodoList() {
  const { data, isPending, isError, error } = useQuery<TodoWithResponsible[]>({
    queryKey: ["todos"],
    queryFn: fetchTodosWithResponsibles,
  });

  if (isPending) {
    return <LoaderCircleIcon className="animate-spin" />;
  }

  if (isError || !data) {
    return (
      <ErrorAlert
        error={error}
        message="Beim Laden der Aufgaben ist ein Fehler aufgetreten."
      />
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Verantwortlich</TableHead>
            <TableHead>Fälligkeit</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.label}</TableCell>
              <TableCell>{todo.responsiblePerson.name}</TableCell>
              <TableCell>{getDueDateLabel(todo.dueDate)}</TableCell>
              <TableCell>{getDoneLabel(todo.done)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
