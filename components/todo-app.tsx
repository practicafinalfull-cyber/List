"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore"
import { getDb } from "@/lib/firebase"
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize Firebase and set up real-time listener
  useEffect(() => {
    try {
      const db = getDb()
      const todosCollection = collection(db, "todos")
      const q = query(todosCollection, orderBy("createdAt", "desc"))

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const todosData: Todo[] = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            todosData.push({
              id: doc.id,
              text: data.text,
              completed: data.completed || false,
            })
          })
          setTodos(todosData)
          setLoading(false)
          setError(null)
        },
        (err) => {
          console.error("Error fetching todos:", err)
          setError("Failed to load tasks. Please check your Firebase configuration.")
          setLoading(false)
        }
      )

      // Cleanup listener on unmount
      return () => unsubscribe()
    } catch (err) {
      console.error("Firebase initialization error:", err)
      setError(err instanceof Error ? err.message : "Failed to initialize Firebase")
      setLoading(false)
    }
  }, [])

  const addTodo = async (text: string) => {
    if (!text.trim()) return

    try {
      const db = getDb()
      const todosCollection = collection(db, "todos")
      await addDoc(todosCollection, {
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      })
      setError(null)
    } catch (err) {
      console.error("Error adding todo:", err)
      setError("Failed to add task. Please try again.")
    }
  }

  const updateTodo = async (id: string, text: string) => {
    if (!text.trim()) return

    try {
      const db = getDb()
      const todoRef = doc(db, "todos", id)
      await updateDoc(todoRef, {
        text: text.trim(),
      })
      setError(null)
    } catch (err) {
      console.error("Error updating todo:", err)
      setError("Failed to update task. Please try again.")
    }
  }

  const toggleTodo = async (id: string) => {
    try {
      const db = getDb()
      const todoRef = doc(db, "todos", id)
      const todo = todos.find((t) => t.id === id)
      if (todo) {
        await updateDoc(todoRef, {
          completed: !todo.completed,
        })
        setError(null)
      }
    } catch (err) {
      console.error("Error toggling todo:", err)
      setError("Failed to update task. Please try again.")
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const db = getDb()
      const todoRef = doc(db, "todos", id)
      await deleteDoc(todoRef)
      setError(null)
    } catch (err) {
      console.error("Error deleting todo:", err)
      setError("Failed to delete task. Please try again.")
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-slate-50 dark:to-slate-950">
      <TodoHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </div>
          )}
          <TodoInput onAdd={addTodo} disabled={loading} />
          {loading ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : (
            <TodoList todos={todos} onUpdate={updateTodo} onToggle={toggleTodo} onDelete={deleteTodo} />
          )}
        </div>
      </main>
      <TodoFooter completedCount={completedCount} totalCount={todos.length} />
    </div>
  )
}
