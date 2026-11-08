import CategoryTag from './CategoryTag.jsx'

const MAX_CERTIFICATIONS = 3

const buttonBase =
  'inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-display text-sm font-normal leading-body transition-all duration-base ease-standard cursor-pointer focus-visible:outline-none focus-visible:shadow-focus-ring'

function ProductCard({
  name,
  brand,
  category,
  subcategory,
  categoryActive = false,
  onCategoryClick,
  cleanScore,
  certifications = [],
  reason,
  avoidedIngredient,
  imageUrl,
  price,
  saved = false,
  onSave,
  comparing = false,
  compareDisabled = false,
  onCompare,
}) {
  const shown = certifications.slice(0, MAX_CERTIFICATIONS)
  const hiddenCount = certifications.length - shown.length

  return (
    <article className="flex h-full flex-col gap-4 rounded-md border border-border bg-surface p-6 shadow-raised transition-shadow duration-base ease-standard">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-surface-warm">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="size-full object-cover" />
        ) : (
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
            <path d="M9 3h6M10 3v3l-2 3v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9l-2-3V3" />
            <path d="M8 13h8" />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="mb-1 flex items-center gap-2">
          <CategoryTag label={category} isActive={categoryActive} onClick={onCategoryClick} />
          {subcategory && <span className="text-sm text-muted">{subcategory}</span>}
        </div>
        <h3 className="line-clamp-2 font-display text-lg font-normal leading-tight text-fg">
          {name}
        </h3>
        <div className="flex items-baseline gap-3">
          <p className="text-sm text-muted">{brand}</p>
          {price != null ? (
            <p className="font-display text-base font-normal text-fg">${price.toFixed(2)}</p>
          ) : (
            <p className="text-sm text-muted">Price not listed</p>
          )}
        </div>
      </div>

      {cleanScore == null ? (
        <p className="text-sm text-muted">No clean score yet</p>
      ) : (
        <p className="flex items-center gap-2 text-sm text-fg">
          <span className="size-2 rounded-pill bg-success" aria-hidden="true" />
          Clean score {cleanScore}/100
        </p>
      )}

      {shown.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Certifications">
          {shown.map((cert) => (
            <li
              key={cert}
              className="rounded-pill border border-border-soft px-3 py-1 text-sm text-muted"
            >
              {cert}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="rounded-pill border border-border-soft px-3 py-1 text-sm text-muted">
              +{hiddenCount}
            </li>
          )}
        </ul>
      )}

      {reason && <p className="text-sm leading-body text-muted">{reason}</p>}

      {avoidedIngredient && (
        <p className="flex items-start gap-2 text-sm text-warn">
          <svg
            className="mt-1 size-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3 2 20h20L12 3Z" />
            <path d="M12 10v4M12 17h.01" />
          </svg>
          Contains {avoidedIngredient}, which you avoid
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-3">
        {/* Added products switch to an outlined pill with a check, so the two states look different. */}
        <button
          type="button"
          aria-pressed={saved}
          onClick={onSave}
          className={`${buttonBase} ${
            saved ? 'border-fg bg-transparent text-fg hover:bg-surface-warm' : 'border-transparent bg-fg text-bg hover:opacity-90'
          }`}
        >
          {saved && (
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l4.5 4.5L19 7" />
            </svg>
          )}
          {saved ? 'In cart' : 'Add to cart'}
        </button>
        {/* Compare shows only where a page supports comparing. */}
        {onCompare && (
          <button
            type="button"
            aria-pressed={comparing}
            disabled={compareDisabled}
            onClick={onCompare}
            className={`${buttonBase} border-fg text-fg disabled:cursor-not-allowed disabled:opacity-50 ${
              comparing ? 'bg-surface-warm' : 'bg-transparent enabled:hover:bg-fg enabled:hover:text-bg'
            }`}
          >
            {comparing && (
              <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4.5 4.5L19 7" />
              </svg>
            )}
            {comparing ? 'Comparing' : compareDisabled ? 'Compare (3 max)' : 'Compare'}
          </button>
        )}
      </div>
    </article>
  )
}

export default ProductCard
