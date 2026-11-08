function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-border-soft p-8 text-center">
      <svg
        className="size-8 text-muted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 7h18l-2 13H5L3 7Z" />
        <path d="M8 7a4 4 0 0 1 8 0" />
      </svg>

      <h3 className="font-display text-lg font-normal leading-tight text-fg">{title}</h3>

      {message && <p className="text-sm leading-body text-muted">{message}</p>}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 rounded-pill border border-fg bg-transparent px-4 py-2 font-display text-sm font-normal leading-body text-fg transition-all duration-base ease-standard cursor-pointer hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
