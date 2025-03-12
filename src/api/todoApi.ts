interface Todo {
    id: number
    title: string
    description: string
    done: boolean
 }

export const fetchTodos = async () => {
  const res = await fetch("http://localhost:5000/todos");
  return res.json();
};

export const addTodoRequest = async (newTodo: Todo) => {
  const res = await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  return res.json();
};

export const deleteTodoRequest = async (id: number) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete todo");
    return response.json();
  };

export const updateTodoRequest = async (todo: Todo) => {
  await fetch(`http://localhost:5000/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};
