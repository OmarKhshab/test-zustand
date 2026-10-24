"use client";

import { useState, type FormEvent } from "react";
import { useTodoStore } from "@/lib/todo-store";

export default function AddTodoForm() {
  const [input, setInput] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  };
  return (
    <form className="mb-2 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="flex-1 px-2 py-2 border rounded-lg"
        placeholder="Add a new todo..."
        aria-label="New todo"
      />
      <button type="submit" aria-label="Add todo" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        +
      </button>
    </form>
  );
}
