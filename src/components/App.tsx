import { ActionButtons } from "./ActionButtons";
import { DialogProvider } from "./context/DialogContext";
import { TodoList } from "./TodoList";

export function App() {
  return (
    <div className="p-12">
      <DialogProvider>
        <div className="flex flex-row justify-between pb-8">
          <h1 className="text-3xl font-bold">Aufgabenliste</h1>
          <ActionButtons />
        </div>
        <TodoList />
      </DialogProvider>
    </div>
  );
}
