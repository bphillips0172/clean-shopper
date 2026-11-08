import { useId } from 'react'

function SearchBar({ value, onChange, onSubmit, isSearching = false }) {
  const inputId = useId()
  const canSearch = value.trim() !== '' && !isSearching

  const handleSubmit = (event) => {
    event.preventDefault()
    if (canSearch) onSubmit()
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-muted">
        Search products
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try baby shampoo or sunscreen"
          className="min-w-0 flex-1 rounded-md border border-border-soft bg-surface-warm px-4 py-3 font-body text-base text-fg outline-none transition duration-fast ease-standard placeholder:text-meta focus:border-accent focus:shadow-focus-ring"
        />
        <button
          type="submit"
          disabled={!canSearch}
          className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-transparent bg-fg px-4 py-2 font-display text-sm font-normal leading-body text-bg transition-all duration-base ease-standard cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSearching ? 'Searching…' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
