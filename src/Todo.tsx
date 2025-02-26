import type React from "react"

import { useState } from "react"

interface Todo {
   id: number
   title: string
   description: string
   done: boolean
}

export default function TodoList() {
   const [todos, setTodos] = useState<Todo[]>([])
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!title.trim()) return

      const newTodo: Todo = {
         id: Date.now(),
         title: title.trim(),
         description: description.trim(),
         done: false,
      }

      setTodos([...todos, newTodo])
      setTitle("")
      setDescription("")
   }

   const toggleTodo = (id: number) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
   }

   return (
      <div className="max-w-2xl mx-auto p-4 px-6">
         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
               <h1 className="text-2xl font-bold text-gray-900 mb-6">Todo List</h1>

               <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <div>
                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                     </label>
                     <input
                        id="title"
                        type="text"
                        placeholder="Enter todo title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                     />
                  </div>

                  <div>
                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                     </label>
                     <textarea
                        id="description"
                        placeholder="Enter todo description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                     />
                  </div>

                  <button
                     type="submit"
                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                     Add Todo
                  </button>
               </form>

               <div className="space-y-4">
                  {todos.map((todo) => (
                     <div key={todo.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-start gap-4">
                           <label className="flex items-center gap-3 cursor-pointer group flex-1">
                              <input
                                 type="checkbox"
                                 checked={todo.done}
                                 onChange={() => toggleTodo(todo.id)}
                                 className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
                              />
                              <div className="flex-1">
                                 <h3
                                    className={`text-base font-medium ${todo.done ? "line-through text-gray-500" : "text-gray-900"
                                       }`}
                                 >
                                    {todo.title}
                                 </h3>
                                 {todo.description && (
                                    <p className={`mt-1 text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-600"}`}>
                                       {todo.description}
                                    </p>
                                 )}
                              </div>
                           </label>
                        </div>
                     </div>
                  ))}
               </div>

               {todos.length === 0 && <p className="text-center text-gray-500 mt-6">No todos yet. Add one above!</p>}
            </div>
         </div>
      </div>
   )
}

