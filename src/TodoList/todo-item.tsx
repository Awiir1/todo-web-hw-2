import { Edit2, Trash2 } from "lucide-react"
import type { Todo } from "./types/todo"
import { useState } from "react"

type TodoItemProps = {
   todo: Todo
   onToggle: (id: number) => void
   onEdit: (todo: Todo) => void
   onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
   const [showConfirm, setShowConfirm] = useState(false)

   return (
      <div className="backdrop-blur-md bg-white/10 rounded-lg p-4 shadow-lg border border-white/20 transition-all hover:bg-white/20">
         <div className="flex items-start gap-4">
            <div className="flex items-start pt-1">
               <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.done}
                  onChange={() => onToggle(todo.id)}
                  className="w-5 h-5 rounded border-white/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-pink-500 cursor-pointer bg-white/20"
               />
            </div>

            <div className="flex-1 min-w-0">
               <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-base font-medium block cursor-pointer ${todo.done ? "line-through text-white/50" : "text-white"
                     }`}
               >
                  {todo.title}
               </label>

               {todo.description && (
                  <p
                     className={`mt-1 text-sm ${todo.done ? "line-through text-white/40" : "text-white/70"
                        }`}
                  >
                     {todo.description}
                  </p>
               )}
            </div>

            <div className="flex gap-2 shrink-0">
               <button
                  onClick={() => onEdit(todo)}
                  disabled={todo.done}
                  className={`h-8 w-8 flex items-center justify-center rounded-md border border-white/30 ${todo.done
                        ? "bg-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white/20 text-white"
                     }`}
                  aria-label="Edit task"
               >
                  <Edit2 className="h-4 w-4" />
               </button>

               {showConfirm ? (
                  <div className="flex gap-1 items-center">
                     <button
                        onClick={() => {
                           onDelete(todo.id)
                           setShowConfirm(false)
                        }}
                        className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                     >
                        Delete
                     </button>
                     <button
                        onClick={() => setShowConfirm(false)}
                        className="text-xs px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded"
                     >
                        Cancel
                     </button>
                  </div>
               ) : (
                  <button
                     onClick={() => setShowConfirm(true)}
                        className="h-8 w-8 flex items-center justify-center rounded-md border border-white/30 bg-white/20 text-white hover:bg-white/20"
                     aria-label="Delete task"
                  >
                     <Trash2 className="h-4 w-4" />
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

