import { Dialog } from "./shadcn-ui/Dialog";

type Props = {
  open: boolean;
  onCancelClick: () => void;
  onSaveClick: () => void;
};

export function CreateTodoDialog({ open, onCancelClick, onSaveClick }: Props) {
  return (
    <Dialog
      open={open}
      title="Neue Aufgabe"
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
    ></Dialog>
  );
}
