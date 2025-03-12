import { TodoForm } from "./todo-form"
import { TodoItem } from "./todo-item"
import { EmptyState } from "./empty-state"
import { AnimatePresence, motion } from "framer-motion"
import { useTodos } from "./hooks/use-todos"
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
   const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, editingTodo, startEditing, cancelEditing } = useTodos()

   return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
         <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-lg overflow-hidden border border-white/20">
               <div className="p-6">
                  <h1 className="text-3xl font-bold text-center mb-6 text-white">Task Manager</h1>

                  <TodoForm onSubmit={(title: string, description: string) => addTodo.mutate({ id: Number(uuidv4()), title, description, done: false })} editingTodo={editingTodo} onUpdate={updateTodo.mutate} onCancel={cancelEditing} />

                  <div className="mt-8 space-y-4">
                     <AnimatePresence mode="popLayout">
                        {todos && todos.map((todo) => (
                           <motion.div
                              key={todo.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <TodoItem todo={todo} onToggle={toggleTodo} onEdit={startEditing} onDelete={(id: number) => deleteTodo.mutate(id)} />
                           </motion.div>
                        ))}
                     </AnimatePresence>

                     {todos && todos.length === 0 && <EmptyState />}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

