function CategoryTag({ label, isActive = false, onClick }) {
  const stateClasses = isActive ? 'bg-fg text-bg' : 'bg-surface-warm text-muted hover:text-fg'

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`inline-flex items-center whitespace-nowrap rounded-pill px-3 py-1 font-body text-sm font-medium transition-colors duration-fast ease-standard cursor-pointer focus-visible:outline-none focus-visible:shadow-focus-ring ${stateClasses}`}
    >
      {label}
    </button>
  )
}

export default CategoryTag
