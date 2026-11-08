import { useState } from 'react'
import CategoryTag from '../../components/CategoryTag.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ProductCard from '../../components/ProductCard.jsx'
import { categories, placeholderProducts } from './placeholderProducts.js'

const ALL = 'All'

function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState(ALL)
  const [savedIds, setSavedIds] = useState([])

  const toggleSaved = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  const shownProducts =
    selectedCategory === ALL
      ? placeholderProducts
      : placeholderProducts.filter((product) => product.category === selectedCategory)

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop">
      <h1 className="font-display text-xl font-normal leading-tight text-fg">Browse</h1>
      <p className="mt-3 text-lg text-muted">Clean products picked for your home and family.</p>

      <div
        role="group"
        aria-label="Filter by category"
        onFocus={(event) => event.target.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
        className="-mx-container-phone mt-5 flex gap-2 overflow-x-auto scroll-px-container-phone px-container-phone py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {[ALL, ...categories].map((label) => (
          <CategoryTag
            key={label}
            label={label}
            isActive={label === selectedCategory}
            onClick={() => setSelectedCategory(label)}
          />
        ))}
      </div>

      <h2 className="sr-only">Products</h2>

      {shownProducts.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No products in this category yet."
            message={`We're still finding clean ${selectedCategory.toLowerCase()} products.`}
            actionLabel="Show all products"
            onAction={() => setSelectedCategory(ALL)}
          />
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shownProducts.map(({ id, ...product }) => (
            <li key={id}>
              <ProductCard
                {...product}
                saved={savedIds.includes(id)}
                onSave={() => toggleSaved(id)}
                categoryActive={product.category === selectedCategory}
                onCategoryClick={() => setSelectedCategory(product.category)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default BrowsePage
