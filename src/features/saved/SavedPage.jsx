import { Link, useNavigate } from 'react-router'
import CartItem from '../../components/CartItem.jsx'
import CartSummary from '../../components/CartSummary.jsx'
import EmptyState from '../../components/EmptyState.jsx'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop'

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-transparent bg-fg px-4 py-2 font-display text-sm leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring'
const ghostButton =
  'inline-flex items-center justify-center gap-2 rounded-pill border border-fg bg-transparent px-4 py-2 font-display text-sm leading-body text-fg transition-all duration-base ease-standard hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring'

function SavedPage({ cart = [], toggleSaved = () => {} }) {
  const navigate = useNavigate()

  return (
    <main className={container}>
      <h1 className="font-display text-xl font-normal leading-tight text-fg">Your cart</h1>
      <p className="mt-3 text-lg text-muted">
        {cart.length === 0
          ? 'Nothing in your cart yet.'
          : `${cart.length} product${cart.length === 1 ? '' : 's'} in your cart.`}
      </p>

      {cart.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty"
            message="Add products from Browse or search, and they’ll show up here."
            actionLabel="Browse products"
            onAction={() => navigate('/browse')}
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <ul className="flex flex-col gap-3 lg:col-span-2">
            {cart.map((product) => (
              <CartItem key={product.id} {...product} onRemove={() => toggleSaved(product)} />
            ))}
          </ul>

          <aside className="flex flex-col gap-5 rounded-md border border-border bg-surface p-6 shadow-raised">
            <h2 className="font-display text-lg font-normal leading-tight text-fg">Summary</h2>
            <CartSummary products={cart} />
            <div className="flex flex-col gap-3">
              <Link to="/checkout" className={primaryButton}>
                Email my cart
              </Link>
              <Link to="/browse" className={ghostButton}>
                Keep browsing
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}

export default SavedPage
