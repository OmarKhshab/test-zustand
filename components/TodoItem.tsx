"use client";

import type { todoItemProps } from "@/interface/todoItemInterface";
import { useTodoStore } from "@/lib/todo-store";

export default function TodoItem ({ todo, handleEdit }: { todo: todoItemProps; handleEdit: (id: number) => void }) {
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const removeTodo = useTodoStore((state) => state.removeTodo);
    return (
        <div className={`flex items-center gap-3 p-3 border rounded-lg ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-300"
      }`}>
        <input
        type="checkbox"
        className="w-5 h-5 text-blue-600"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`}
        ></input>
        <div className="flex-1">
        <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.text}
        </span>
        </div>
        <div className="flex gap-1">
            <>
             <button 
             onClick={() => toggleTodo(todo.id)}
             aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`}
             className="p-1 text-blue-600 hover:bg-blue-100 rounded"
             >✅</button>
             <button 
             onClick={() => handleEdit(todo.id)}
             aria-label={`Edit ${todo.text}`}
             className="p-1 text-blue-600 hover:bg-blue-100 rounded"
             >✏️</button>
             <button
             onClick={() => removeTodo(todo.id)}
             aria-label={`Delete ${todo.text}`}
             className="p-1 text-red-600 hover:bg-red-100 rounded"
             >🗑️</button>
            </>
        </div>
      </div>
    )
}
