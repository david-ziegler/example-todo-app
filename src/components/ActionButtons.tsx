import { Button } from "./shadcn-ui/Button";
import { CreateEditDialog } from "./CreateEditDialog";
import { useDialog } from "./context/useDialog";
import { deleteTodos } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  selectedTodos: Set<number>;
  setSelectedTodos: (selectedTodos: Set<number>) => void;
};

export function ActionButtons({ selectedTodos, setSelectedTodos }: Props) {
  const { dialog, openCreateDialog } = useDialog();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });

  const deleteSelectedTodos = async () => {
    deleteMutation.mutate(Array.from(selectedTodos));
    setSelectedTodos(new Set());
  };

  const deleteButtonLabel = `Aufgabe${
    selectedTodos.size > 1 ? "n" : ""
  } löschen`;

  return (
    <>
      <div className="flex space-x-4">
        <Button
          onClick={deleteSelectedTodos}
          variant="outline"
          disabled={selectedTodos.size === 0}
        >
          {deleteButtonLabel}
        </Button>
        <Button onClick={openCreateDialog}>Aufgabe hinzufügen</Button>
      </div>
      {dialog !== undefined && <CreateEditDialog />}
    </>
  );
}
