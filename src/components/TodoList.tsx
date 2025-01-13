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
import { Checkbox } from "./shadcn-ui/Checkbox";

type Props = {
  selectedTodos: Set<number>;
  setSelectedTodos: React.Dispatch<React.SetStateAction<Set<number>>>;
};

export function TodoList({ selectedTodos, setSelectedTodos }: Props) {
  const { openEditDialog } = useDialog();

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery<TodoWithResponsible[]>({
    queryKey: ["todos"],
    queryFn: fetchTodosWithResponsibles,
  });

  if (isPending) {
    return (
      <LoaderCircleIcon
        size={30}
        className="animate-spin mx-auto mt-[150px] stroke-primary/70"
      />
    );
  }

  if (isError || !todos) {
    return (
      <ErrorAlert
        error={error}
        message="Beim Laden der Aufgaben ist ein Fehler aufgetreten."
      />
    );
  }

  const setIsSelected = (id: number, value: boolean | "indeterminate") => {
    // Value will always be `true` | `false`, never "indeterminate" because we never set a checkbox to "indeterminate"
    setSelectedTodos((prev) => {
      const updated = new Set<number>(prev);
      if (value) {
        updated.add(id);
      } else {
        updated.delete(id);
      }
      return updated;
    });
  };

  const setAllIsSelected = (value: boolean | "indeterminate") => {
    setSelectedTodos(() => {
      const updated = new Set<number>();
      for (const todo of todos) {
        if (value) {
          updated.add(todo.id);
        } else {
          updated.delete(todo.id);
        }
      }
      return updated;
    });
  };

  const isAllSelected =
    todos?.length > 1 && selectedTodos.size === todos?.length;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead role="checkbox">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(value) => setAllIsSelected(value)}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Verantwortlich</TableHead>
            <TableHead>Fälligkeit</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell role="checkbox">
                <Checkbox
                  checked={selectedTodos.has(todo.id)}
                  onCheckedChange={(value) => setIsSelected(todo.id, value)}
                  aria-label="Select row"
                />
              </TableCell>
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
