import { Link } from 'react-router'

const focusRing = 'focus-visible:outline-none focus-visible:shadow-focus-ring'

function CompareTray({ products, max = 3, onRemove, onClear }) {
  const canCompare = products.length >= 2
  const status = canCompare ? `${products.length} of ${max}` : 'Pick 1 more'

  return (
    <section
      aria-label="Products to compare"
      className="sticky bottom-4 mt-8 flex flex-col gap-3 rounded-md border border-border bg-surface p-4 shadow-raised sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <p className="shrink-0 text-sm text-fg" aria-live="polite">
          <span className="font-medium">Compare</span> <span className="text-muted">· {status}</span>
        </p>
        <ul className="flex gap-2 overflow-x-auto py-1">
          {products.map((product) => (
            <li key={product.id} className="flex shrink-0 items-center gap-1 rounded-pill bg-surface-warm py-1 pl-3 pr-1 text-sm text-fg">
              <span className="max-w-48 truncate">{product.name}</span>
              <button
                type="button"
                onClick={() => onRemove(product)}
                aria-label={`Remove ${product.name} from comparison`}
                className={`flex size-6 items-center justify-center rounded-pill text-muted transition-colors duration-fast ease-standard cursor-pointer hover:text-fg ${focusRing}`}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {canCompare ? (
          <Link
            to="/compare"
            className={`inline-flex items-center gap-2 rounded-pill border border-transparent bg-fg px-4 py-2 font-display text-sm leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 ${focusRing}`}
          >
            Compare now
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-pill border border-transparent bg-fg px-4 py-2 font-display text-sm leading-body text-bg opacity-50"
          >
            Compare now
          </span>
        )}
        <button
          type="button"
          onClick={onClear}
          className={`rounded-pill px-2 py-1 text-sm text-muted transition-colors duration-fast ease-standard cursor-pointer hover:text-fg ${focusRing}`}
        >
          Clear
        </button>
      </div>
    </section>
  )
}

export default CompareTray
