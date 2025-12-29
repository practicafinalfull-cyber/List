"use client"

import { TodoItem } from "./todo-item"
import type { Todo } from "./todo-app"

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, text: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onUpdate, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 rounded-lg border border-border bg-card p-6">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
