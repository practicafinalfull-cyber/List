"use client"

import { useState } from "react"
import { TodoHeader } from "./todo-header"
import { TodoInput } from "./todo-input"
import { TodoList } from "./todo-list"
import { TodoFooter } from "./todo-footer"

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    if (!text.trim()) return
    setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }])
  }

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-slate-50 dark:to-slate-950">
      <TodoHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <TodoInput onAdd={addTodo} />
          <TodoList todos={todos} onUpdate={updateTodo} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
      </main>
      <TodoFooter completedCount={completedCount} totalCount={todos.length} />
    </div>
  )
}
