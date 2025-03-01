import { ClipboardList } from "lucide-react"

export function EmptyState() {
   return (
      <div className="text-center py-10">
         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
            <ClipboardList className="h-8 w-8 text-white" />
         </div>
         <h3 className="text-lg font-medium text-white">No tasks yet</h3>
         <p className="text-white text-opacity-70 mt-1">Add a new task to get started</p>
      </div>
   )
}

