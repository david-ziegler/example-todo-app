import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todos";
import { Todo } from "../types/todo";

function TodoList() {
  const { isPending, error, data } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isPending) {
    return <div>loading</div>; // TODO
  }

  return (
    <div>
      {data?.map((todo) => (
        <div>{todo.id}</div>
      ))}
    </div>
  );
}

export default TodoList;
