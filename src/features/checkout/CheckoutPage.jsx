import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import CartItem from '../../components/CartItem.jsx'
import CartSummary from '../../components/CartSummary.jsx'
import EmptyState from '../../components/EmptyState.jsx'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop'

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-transparent bg-fg px-4 py-2 font-display text-sm leading-body text-bg transition-all duration-base ease-standard cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring'
const ghostButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-fg bg-transparent px-4 py-2 font-display text-sm leading-body text-fg transition-all duration-base ease-standard cursor-pointer hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring'

// Products grouped by category, in the order they were added.
function groupByCategory(products) {
  return products.reduce((groups, product) => {
    ;(groups[product.category] ??= []).push(product)
    return groups
  }, {})
}

// The cart as plain text, for the email body and the clipboard.
function cartAsText(groups) {
  const sections = Object.entries(groups).map(([category, products]) => {
    const lines = products.map((product) => {
      const details = [product.brand, product.price != null ? `$${product.price.toFixed(2)}` : 'price not listed']
      if (product.cleanScore != null) details.push(`clean score ${product.cleanScore}/100`)
      return `- ${product.name} (${details.join(', ')})`
    })
    return `${category}\n${lines.join('\n')}`
  })
  return `My Clean Shopper cart\n\n${sections.join('\n\n')}\n`
}

// Clean Shopper has no email service, so this opens the shopper's own email app with the list
// filled in, and offers copying as a fallback. Nothing is sent by the app itself.
function CheckoutPage({ cart = [], toggleSaved = () => {} }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  if (cart.length === 0) {
    return (
      <main className={container}>
        <h1 className="font-display text-xl font-normal leading-tight text-fg">Email your cart</h1>
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty"
            message="Add products first, then come back to email yourself the list."
            actionLabel="Browse products"
            onAction={() => navigate('/browse')}
          />
        </div>
      </main>
    )
  }

  const groups = groupByCategory(cart)
  const categoryCount = Object.keys(groups).length
  const text = cartAsText(groups)
  const mailto = `mailto:?subject=${encodeURIComponent('My Clean Shopper cart')}&body=${encodeURIComponent(text)}`

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copied. Paste it into a note or message.')
    } catch {
      setStatus('Couldn’t copy automatically. Try Open email instead.')
    }
  }

  return (
    <main className={container}>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/saved" className="rounded-md transition-colors duration-fast ease-standard hover:text-fg focus-visible:outline-none focus-visible:shadow-focus-ring">
              Cart
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="text-fg">
            Email
          </li>
        </ol>
      </nav>

      <h1 className="font-display text-xl font-normal leading-tight text-fg">Email your cart</h1>
      <p className="mt-3 text-lg leading-body text-muted">
        {cart.length} product{cart.length === 1 ? '' : 's'} across {categoryCount} {categoryCount === 1 ? 'category' : 'categories'}.
        Send yourself the list so you have it at the store.
      </p>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          {Object.entries(groups).map(([category, products]) => (
            <section key={category} aria-labelledby={`group-${category}`}>
              <h2 id={`group-${category}`} className="mb-4 font-display text-lg font-normal leading-tight text-fg">
                {category}
              </h2>
              <ul className="flex flex-col gap-3">
                {products.map((product) => (
                  <CartItem key={product.id} {...product} onRemove={() => toggleSaved(product)} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="flex flex-col gap-5 rounded-md border border-border bg-surface p-6 shadow-raised">
          <h2 className="font-display text-lg font-normal leading-tight text-fg">Send it to yourself</h2>
          <CartSummary products={cart} />
          <div className="flex flex-col gap-3">
            <a href={mailto} onClick={() => setStatus('Your email app should open with the list filled in.')} className={primaryButton}>
              Open email
            </a>
            <button type="button" onClick={copyList} className={ghostButton}>
              Copy list
            </button>
          </div>
          <p className="text-sm leading-body text-muted" aria-live="polite">
            {status || 'Opens your own email app. Clean Shopper doesn’t send email for you.'}
          </p>
        </aside>
      </div>
    </main>
  )
}

export default CheckoutPage
