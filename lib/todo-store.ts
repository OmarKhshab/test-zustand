import { create } from "zustand";
import type { todoItemProps } from "@/interface/todoItemInterface";

interface TodoStore {
  todos: todoItemProps[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [
    { id: 1, text: "Learn React", completed: false, createdAt: new Date('2023-01-01') },
    { id: 2, text: "Learn Next.js", completed: true, createdAt: new Date('2023-01-02') },
    { id: 3, text: "Build a Todo App", completed: false, createdAt: new Date('2023-01-03') },
  ],
  addTodo: (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    set((state) => ({
      todos: [...state.todos, {
        id: state.todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1,
        text: trimmedText,
        completed: false,
        createdAt: new Date(),
      }],
    }));
  },
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  })),
}));
