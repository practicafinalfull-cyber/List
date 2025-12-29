interface TodoFooterProps {
  completedCount: number
  totalCount: number
}

export function TodoFooter({ completedCount, totalCount }: TodoFooterProps) {
  const remainingCount = totalCount - completedCount

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {remainingCount === 0 ? (
              <span>🎉 All tasks completed!</span>
            ) : (
              <span>
                {remainingCount} of {totalCount} {totalCount === 1 ? "task" : "tasks"} remaining
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">Keep up the great work!</div>
        </div>
      </div>
    </footer>
  )
}
