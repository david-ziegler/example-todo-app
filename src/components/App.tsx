import { useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { DialogProvider } from "./context/DialogContext";
import { TodoList } from "./TodoList";

export function App() {
  const [selectedTodos, setSelectedTodos] = useState(new Set<number>());

  return (
    <div className="p-12">
      <DialogProvider>
        <div className="flex flex-row justify-between pb-8">
          <h1 className="text-3xl font-bold pl-2">Aufgabenliste</h1>
          <ActionButtons
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
          />
        </div>
        <TodoList
          selectedTodos={selectedTodos}
          setSelectedTodos={setSelectedTodos}
        />
      </DialogProvider>
    </div>
  );
}
