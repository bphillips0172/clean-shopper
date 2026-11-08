function CartItem({ name, brand, category, subcategory, cleanScore, price, onRemove }) {
  return (
    <li className="flex items-start gap-4 rounded-md border border-border bg-surface p-4 shadow-raised">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-display text-base font-normal leading-tight text-fg">{name}</p>
        <p className="text-sm text-muted">
          {brand} · {subcategory ? `${category}, ${subcategory}` : category}
        </p>
        {cleanScore != null && (
          <p className="flex items-center gap-2 text-sm text-fg">
            <span className="size-2 rounded-pill bg-success" aria-hidden="true" />
            Clean score {cleanScore}/100
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        {price != null ? (
          <p className="font-display text-base font-normal text-fg">${price.toFixed(2)}</p>
        ) : (
          <p className="text-sm text-muted">Price not listed</p>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name} from cart`}
          className="inline-flex items-center gap-1 rounded-pill px-2 py-1 text-sm text-muted transition-colors duration-fast ease-standard cursor-pointer hover:text-fg focus-visible:outline-none focus-visible:shadow-focus-ring"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
