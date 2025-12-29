"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { Todo } from "./todo-app"

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, text: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onUpdate, onToggle, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 rounded-md bg-muted p-3">
        <Input value={editText} onChange={(e) => setEditText(e.target.value)} autoFocus className="flex-1" />
        <Button onClick={handleSave} variant="outline" size="sm">
          Save
        </Button>
        <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-md border border-transparent bg-muted/30 p-3 transition-colors hover:bg-muted/50">
      <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} />
      <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
        {todo.text}
      </span>
      <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">
        Edit
      </Button>
      <Button onClick={() => onDelete(todo.id)} variant="destructive" size="sm">
        Delete
      </Button>
    </div>
  )
}
