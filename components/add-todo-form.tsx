"use client";

import { useState, type SubmitEvent } from "react";
import { useTodoStore } from "@/lib/todo-store";

interface AddTodoFormProps {
  isEditing?: boolean;
  id?: number;
  onDone?: () => void;
}

export default function AddTodoForm({ isEditing = false, id, onDone }: AddTodoFormProps) {
  const todo = useTodoStore((state) =>
    id === undefined ? undefined : state.getTodoById(id),
  );
  const [input, setInput] = useState(isEditing ? todo?.text ?? "" : "");
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    if (isEditing) {
      if (!todo) return;
      updateTodo(todo.id, input);
    } else {
      addTodo(input);
    }
    setInput("");
    onDone?.();
  };
  return (
    <form className="mb-2 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="flex-1 px-2 py-2 border rounded-lg"
        placeholder={isEditing ? "Edit todo..." : "Add a new todo..."}
        aria-label={isEditing ? "Edit todo" : "New todo"}
      />
      <button type="submit" aria-label={isEditing ? "Save todo" : "Add todo"} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        {isEditing ? "Save" : "+"}
      </button>
      {isEditing && <button type="button" onClick={onDone}>Cancel</button>}
    </form>
  );
}
