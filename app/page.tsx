"use client";

import AddTodoForm from "@/components/add-todo-form";
import TodoItem from "@/components/TodoItem";
import TodoStats from "@/components/TodoStats";
import { useTodoStore } from "@/lib/todo-store";
import { useState } from "react";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const editingTodo = todos.find((todo) => todo.id === editingTodoId);
  const handleEdit = (id: number) => {
    setEditingTodoId(id);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
        <AddTodoForm
          key={editingTodo?.id ?? "new"}
          isEditing={editingTodo !== undefined}
          id={editingTodo?.id}
          onDone={() => setEditingTodoId(null)}
        />
        <TodoStats />
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500">No todos yet</div>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} handleEdit={handleEdit} />)
          )}
        </div>
      </div>
    </div>
  );
}
