"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TodoInputProps {
  onAdd: (text: string) => void
  disabled?: boolean
}

export function TodoInput({ onAdd, disabled = false }: TodoInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!disabled && input.trim()) {
      onAdd(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          disabled={disabled}
        />
        <Button type="submit" className="px-6" disabled={disabled}>
          Add
        </Button>
      </div>
    </form>
  )
}
