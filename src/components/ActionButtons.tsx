import { useState } from "react";
import { Button } from "./shadcn-ui/Button";
import { CreateTodoDialog } from "./CreateTodoDialog";

export function ActionButtons() {
  const [isCreateTodoDialogOpen, setIsCreateTodoDialogOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsCreateTodoDialogOpen(true)}>
        Aufgabe hinzufügen
      </Button>
      {isCreateTodoDialogOpen && (
        <CreateTodoDialog
          open={isCreateTodoDialogOpen}
          closeDialog={() => setIsCreateTodoDialogOpen(false)}
        />
      )}
    </div>
  );
}
