import { Link } from 'react-router'
import ProductCard from '../../components/ProductCard.jsx'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop'

function SavedPage({ cart = [], toggleSaved = () => {} }) {
  const savedProducts = cart

  return (
    <main className={container}>
      <h1 className="font-display text-xl font-normal leading-tight text-fg">Your cart</h1>
      <p className="mt-3 text-lg text-muted">
        {savedProducts.length === 0
          ? 'Your cart is empty.'
          : `${savedProducts.length} product${savedProducts.length === 1 ? '' : 's'} in your cart.`}
      </p>

      {savedProducts.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <svg
            className="size-12 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="3" width="12" height="14" rx="2" />
            <path d="M7 7h6M7 10h6M7 13h4" />
          </svg>
          <p className="max-w-[32ch] text-base leading-body text-muted">
            Browse products and hit "Add to cart" to build your clean shopping cart.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 rounded-pill border-2 border-transparent bg-fg py-3 pl-4 pr-[26px] font-display text-base leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map(({ id, ...product }) => (
              <li key={id}>
                <ProductCard
                  {...product}
                  saved
                  onSave={() => toggleSaved({ id, ...product })}
                />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <Link
              to="/checkout"
              className="inline-flex cursor-pointer items-center gap-2 rounded-pill border-2 border-transparent bg-fg py-3 pl-4 pr-[26px] font-display text-base leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus-ring"
            >
              Proceed to checkout
              <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              to="/browse"
              className="inline-flex cursor-pointer items-center gap-2 rounded-pill border-2 border-fg bg-transparent py-3 pl-4 pr-[26px] font-display text-base leading-body text-fg transition-all duration-base ease-standard hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring"
            >
              Keep browsing
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

export default SavedPage
