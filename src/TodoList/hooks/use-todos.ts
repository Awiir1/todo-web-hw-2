import { useState } from "react";
import type { Todo } from "../types/todo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTodoRequest,
  fetchTodos,
  updateTodoRequest,
  deleteTodoRequest
} from "../../api/todoApi";

export function useTodos() {
  const queryClient = useQueryClient();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const {
    data: todos
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodo = useMutation({
    mutationFn: addTodoRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodo = useMutation({
    mutationFn: updateTodoRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
   mutationFn: deleteTodoRequest,
   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
 });

 const toggleTodo = (id: number) => {
   const todo = todos?.find((todo) => todo.id === id);
   if (!todo) return;
 
   updateTodo.mutate({ ...todo, done: !todo.done });
 };
 

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
  };

  return {
    todos,
    editingTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    startEditing,
    cancelEditing,
  };
}
