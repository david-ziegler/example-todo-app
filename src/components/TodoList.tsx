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
import { Link } from "./Link";
import { useDialog } from "./context/useDialog";

export function TodoList() {
  const { openEditDialog } = useDialog();

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
              <TableCell>
                <Link onClick={() => openEditDialog(todo.id)}>
                  {todo.label}
                </Link>
              </TableCell>
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
