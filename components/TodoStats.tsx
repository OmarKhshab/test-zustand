"use client";

import { useTodoStore } from "@/lib/todo-store";

export default function TodoStats() {
    const todos = useTodoStore((state) => state.todos);
    const completed = todos.filter((todo) => todo.completed).length;
    const stats = {
        total: todos.length,
        active: todos.length - completed,
        completed,
    };
  return (
    <div className="mb-4 text-center">
      <div className="inline-flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
        <span>📋 Total: {stats.total}</span>
        <span>⏳ Active: {stats.active}</span>
        <span>✅ Completed: {stats.completed}</span>
      </div>
    </div>
  );
}
