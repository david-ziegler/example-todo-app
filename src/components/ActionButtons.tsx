import { Button } from "./shadcn-ui/Button";
import { CreateTodoDialog } from "./CreateTodoDialog";
import { useDialog } from "./context/useDialog";

export function ActionButtons() {
  const { dialog, openCreateDialog } = useDialog();

  return (
    <div>
      <Button onClick={openCreateDialog}>Aufgabe hinzufügen</Button>
      {dialog !== undefined && <CreateTodoDialog />}
    </div>
  );
}
