import { createContext, useState } from "react";

export type DialogContextType = {
  dialog: { type: "create" | "edit"; todoId?: number } | undefined;
  openCreateDialog: () => void;
  openEditDialog: (todoId: number) => void;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<DialogContextType["dialog"]>();

  const openCreateDialog = () => {
    setDialog({ type: "create" });
  };

  const openEditDialog = (todoId: number) => {
    setDialog({ type: "edit", todoId });
  };

  const closeDialog = () => {
    setDialog(undefined);
  };

  return (
    <DialogContext.Provider
      value={{ dialog, openCreateDialog, openEditDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};
