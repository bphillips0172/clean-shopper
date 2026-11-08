import { useState } from 'react'
import CategoryTag from '../../components/CategoryTag.jsx'
import ProductCard from '../../components/ProductCard.jsx'
import { categories, placeholderProducts } from './placeholderProducts.js'

const ALL = 'All'

function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [savedIds, setSavedIds] = useState([])

  const toggleSaved = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  const shownProducts =
    activeCategory === ALL
      ? placeholderProducts
      : placeholderProducts.filter((product) => product.category === activeCategory)

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop">
      <h1 className="font-display text-xl font-normal leading-tight text-fg">Browse</h1>
      <p className="mt-3 text-lg text-muted">Clean products picked for your home and family.</p>

      <div role="group" aria-label="Filter by category" className="mt-6 flex flex-wrap gap-2">
        {[ALL, ...categories].map((label) => (
          <CategoryTag
            key={label}
            label={label}
            isActive={label === activeCategory}
            onClick={() => setActiveCategory(label)}
          />
        ))}
      </div>

      <h2 className="sr-only">Products</h2>

      {shownProducts.length === 0 ? (
        <p className="mt-8 text-base text-muted">No products in this category yet.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shownProducts.map(({ id, ...product }) => (
            <li key={id}>
              <ProductCard
                {...product}
                saved={savedIds.includes(id)}
                onSave={() => toggleSaved(id)}
                categoryActive={product.category === activeCategory}
                onCategoryClick={() => setActiveCategory(product.category)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default BrowsePage
