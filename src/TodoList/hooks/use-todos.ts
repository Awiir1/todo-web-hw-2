import { useState } from "react"
import type { Todo } from "../types/todo"

export function useTodos() {
   const [todos, setTodos] = useState<Todo[]>([])
   const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

   const addTodo = (title: string, description: string) => {
      const newTodo: Todo = {
         id: Date.now(),
         title: title.trim(),
         description: description.trim(),
         done: false,
      }
      setTodos([...todos, newTodo])
   }

   const updateTodo = (updatedTodo: Todo) => {
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
      setEditingTodo(null)
   }

   const deleteTodo = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id))
      if (editingTodo?.id === id) {
         setEditingTodo(null)
      }
   }

   const toggleTodo = (id: number) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
   }

   const startEditing = (todo: Todo) => {
      setEditingTodo(todo)
   }

   const cancelEditing = () => {
      setEditingTodo(null)
   }

   return {
      todos,
      editingTodo,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      startEditing,
      cancelEditing,
   }
}

