import { useEffect, useState, type FormEvent } from "react"
import { PlusCircle, Save } from "lucide-react"
import type { Todo } from "./types/todo"

type TodoFormProps = {
   onSubmit: (title: string, description: string) => void
   onUpdate: (todo: Todo) => void
   onCancel: () => void
   editingTodo: Todo | null
}

export function TodoForm({ onSubmit, onUpdate, onCancel, editingTodo }: TodoFormProps) {
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [titleError, setTitleError] = useState("")

   useEffect(() => {
      if (editingTodo) {
         setTitle(editingTodo.title)
         setDescription(editingTodo.description)
      } else {
         setTitle("")
         setDescription("")
      }
   }, [editingTodo])

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()

      if (!title.trim()) {
         setTitleError("Title is required")
         return
      }

      if (editingTodo) {
         onUpdate({
            ...editingTodo,
            title: title.trim(),
            description: description.trim(),
         })
      } else {
         onSubmit(title.trim(), description.trim())
      }

      setTitle("")
      setDescription("")
      setTitleError("")
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
               Title
            </label>
            <input
               id="title"
               type="text"
               value={title}
               onChange={(e) => {
                  setTitle(e.target.value)
                  if (e.target.value.trim()) setTitleError("")
               }}
               placeholder="What needs to be done?"
               className="w-full px-4 py-2 bg-white/20  border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors placeholder-white/50 text-white"
               autoFocus
            />
            {titleError && <p className="mt-1 text-sm text-red-300">{titleError}</p>}
         </div>

         <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
               Description
            </label>
            <textarea
               id="description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Add details (optional)"
               rows={3}
               className="w-full px-4 py-2 bg-white/20  border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors resize-none placeholder-white/50 text-white"
            />
         </div>

         <div className="flex gap-2">
            <button
               type="submit"
               className={`flex-1 flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-500 ${editingTodo
                  ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                  : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500"
                  }`}
            >
               {editingTodo ? (
                  <>
                     <Save className="h-4 w-4" />
                     Update Task
                  </>
               ) : (
                  <>
                     <PlusCircle className="h-4 w-4" />
                     Add Task
                  </>
               )}
            </button>

            {editingTodo && (
               <button
                  type="button"
                  onClick={onCancel}
                  className="bg-white/20  hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
               >
                  Cancel
               </button>
            )}
         </div>
      </form>
   )
}

