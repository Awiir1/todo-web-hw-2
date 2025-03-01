import { TodoForm } from "./todo-form"
import { TodoItem } from "./todo-item"
import { EmptyState } from "./empty-state"
import { AnimatePresence, motion } from "framer-motion"
import { useTodos } from "./hooks/use-todos"

export default function TodoList() {
   const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, editingTodo, startEditing, cancelEditing } = useTodos()

   return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
         <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-lg overflow-hidden border border-white/20">
               <div className="p-6">
                  <h1 className="text-3xl font-bold text-center mb-6 text-white">Task Manager</h1>

                  <TodoForm onSubmit={addTodo} editingTodo={editingTodo} onUpdate={updateTodo} onCancel={cancelEditing} />

                  <div className="mt-8 space-y-4">
                     <AnimatePresence mode="popLayout">
                        {todos.map((todo) => (
                           <motion.div
                              key={todo.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <TodoItem todo={todo} onToggle={toggleTodo} onEdit={startEditing} onDelete={deleteTodo} />
                           </motion.div>
                        ))}
                     </AnimatePresence>

                     {todos.length === 0 && <EmptyState />}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

