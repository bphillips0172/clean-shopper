import { useState } from 'react'
import { Link } from 'react-router'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop'

const primaryButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-pill border-2 border-transparent bg-fg py-3 pl-4 pr-[26px] font-display text-base leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-40'

const ghostButton =
  'inline-flex cursor-pointer items-center gap-2 rounded-pill border-2 border-fg bg-transparent py-3 pl-4 pr-[26px] font-display text-base leading-body text-fg transition-all duration-base ease-standard hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring'

const inputClass =
  'w-full rounded-md border border-border-soft bg-surface-warm px-4 py-3 font-body text-base text-fg placeholder:text-meta transition-[border-color,box-shadow] duration-fast ease-standard focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-focus-ring'

function ArrowIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function RemoveButton({ onClick, productName }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Remove ${productName} from list`}
      className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-fast ease-standard hover:text-fg focus-visible:outline-none focus-visible:shadow-focus-ring"
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  )
}

function ProductRow({ id, name, brand, category, cleanScore, price, toggleSaved }) {
  return (
    <li className="flex items-center gap-4 rounded-md border border-border bg-surface p-4 shadow-raised">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-display text-base font-normal leading-tight text-fg">{name}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{brand}</span>
          <span className="rounded-pill bg-surface-warm px-3 py-1 text-sm font-medium text-muted">{category}</span>
          {cleanScore != null && (
            <span className="flex items-center gap-1.5 text-sm text-fg">
              <span className="size-2 rounded-pill bg-success" aria-hidden="true" />
              {cleanScore}/100
            </span>
          )}
        </div>
      </div>
      {price != null && (
        <p className="shrink-0 font-display text-base font-normal text-fg">${price.toFixed(2)}</p>
      )}
      <RemoveButton onClick={() => toggleSaved({ id })} productName={name} />
    </li>
  )
}

function SuccessState({ name, count }) {
  return (
    <main className={container}>
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-surface-warm">
          <svg className="size-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12l4.5 4.5L19 7" />
          </svg>
        </span>
        <div>
          <h1 className="font-display text-xl font-normal leading-tight text-fg sm:text-2xl">
            Your list is on its way.
          </h1>
          <p className="mx-auto mt-4 max-w-[40ch] text-base leading-body text-muted">
            We've sent {count} clean product{count === 1 ? '' : 's'} to your inbox
            {name ? `, ${name.split(' ')[0]}` : ''}. Happy shopping.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/browse" className={primaryButton}>
            Keep browsing
            <ArrowIcon />
          </Link>
          <Link to="/saved" className={ghostButton}>
            Back to cart
          </Link>
        </div>
      </div>
    </main>
  )
}

function CheckoutPage({ cart = [], toggleSaved = () => {} }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const savedProducts = cart

  // Group saved products by category, preserving insertion order.
  const byCategory = savedProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = []
    acc[product.category].push(product)
    return acc
  }, {})

  const subtotal = savedProducts.reduce((sum, p) => sum + (p.price ?? 0), 0)

  const categoryEntries = Object.entries(byCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return <SuccessState name={name} count={savedProducts.length} />
  }

  if (savedProducts.length === 0) {
    return (
      <main className={container}>
        <h1 className="font-display text-xl font-normal leading-tight text-fg">Checkout</h1>
        <div className="mt-12 flex flex-col items-center gap-4 rounded-md border border-dashed border-border-soft p-8 text-center">
          <svg className="size-8 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7h18l-2 13H5L3 7Z" />
            <path d="M8 7a4 4 0 0 1 8 0" />
          </svg>
          <h2 className="font-display text-lg font-normal leading-tight text-fg">Your list is empty</h2>
          <p className="text-sm leading-body text-muted">Save some products first, then come back here to send yourself the list.</p>
          <Link to="/browse" className={ghostButton}>
            Browse products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={container}>
      {/* Page header */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link to="/saved" className="transition-colors duration-fast ease-standard hover:text-fg focus-visible:outline-none focus-visible:shadow-focus-ring rounded-sm">
          Cart
        </Link>
        <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
        <span className="text-fg" aria-current="page">Checkout</span>
      </nav>

      <h1 className="font-display text-xl font-normal leading-tight text-fg sm:text-2xl">
        Review your list
      </h1>
      <p className="mt-3 text-base leading-body text-muted">
        {savedProducts.length} product{savedProducts.length === 1 ? '' : 's'} across {categoryEntries.length} {categoryEntries.length === 1 ? 'category' : 'categories'}. We'll email this to you so you have it at the store.
      </p>

      <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: product list grouped by category */}
        <div className="flex flex-col gap-8">
          {categoryEntries.map(([category, products]) => (
            <section key={category} aria-label={category}>
              <h2 className="mb-4 font-display text-lg font-normal leading-tight text-fg">{category}</h2>
              <ul className="flex flex-col gap-3">
                {products.map(({ id, name, brand, category, cleanScore, price }) => (
                  <ProductRow key={id} id={id} name={name} brand={brand} category={category} cleanScore={cleanScore} price={price} toggleSaved={toggleSaved} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Right: send-list form */}
        <aside>
          <div className="sticky top-6 rounded-md border border-border bg-surface p-6 shadow-raised">
            <h2 className="font-display text-lg font-normal leading-tight text-fg">Send your list</h2>
            <p className="mt-2 text-sm leading-body text-muted">
              We'll email you a clean copy to take to the store.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-name" className="text-sm font-medium text-muted">
                  Your name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="checkout-email" className="text-sm font-medium text-muted">
                  Email address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="mt-1 border-t border-border pt-5">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted">Products</span>
                  <span className="font-medium text-fg">{savedProducts.length}</span>
                </div>
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted">Categories</span>
                  <span className="font-medium text-fg">{categoryEntries.length}</span>
                </div>
                {subtotal > 0 && (
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-display text-base font-normal text-fg">Subtotal</span>
                    <span className="font-display text-base font-normal text-fg">${subtotal.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !email.trim()}
                className={primaryButton}
              >
                Send my list
                <ArrowIcon />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CheckoutPage
