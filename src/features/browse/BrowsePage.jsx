import { useRef, useState } from 'react'
import { useLocation } from 'react-router'
import CategoryTag from '../../components/CategoryTag.jsx'
import CompareTray from '../../components/CompareTray.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ProductCard from '../../components/ProductCard.jsx'
import SearchBar from '../../components/SearchBar.jsx'
import { categories, placeholderProducts } from './placeholderProducts.js'
import { searchProducts } from './searchProducts.js'

const ALL = 'All'

const ghostButton =
  'inline-flex items-center gap-2 rounded-pill border border-fg bg-transparent px-4 py-2 font-display text-sm font-normal leading-body text-fg transition-all duration-base ease-standard cursor-pointer hover:bg-fg hover:text-bg focus-visible:outline-none focus-visible:shadow-focus-ring'

// status: idle (browsing), searching, done or error
const NO_SEARCH = { status: 'idle', query: '', results: [] }

function BrowsePage({
  savedIds = [],
  toggleSaved = () => {},
  compareList = [],
  maxCompare = 3,
  toggleCompare = () => {},
  clearCompare = () => {},
}) {
  const compareIds = compareList.map((item) => item.id)
  const compareFull = compareList.length >= maxCompare

  // Another page can open Browse already filtered, e.g. from a category tag on the landing page.
  const { state } = useLocation()
  const [selectedCategory, setSelectedCategory] = useState(state?.category ?? ALL)
  const [searchText, setSearchText] = useState('')
  const [search, setSearch] = useState(NO_SEARCH)
  const latestSearch = useRef(0)

  const runSearch = async () => {
    const query = searchText.trim()
    const searchId = ++latestSearch.current
    setSearch({ status: 'searching', query, results: [] })
    try {
      const results = await searchProducts(query)
      if (searchId === latestSearch.current) setSearch({ status: 'done', query, results })
    } catch {
      if (searchId === latestSearch.current) setSearch({ status: 'error', query, results: [] })
    }
  }

  const clearSearch = () => {
    latestSearch.current++
    setSearchText('')
    setSearch(NO_SEARCH)
  }

  const showCategory = (category) => {
    clearSearch()
    setSelectedCategory(category)
  }

  const isSearchMode = search.status !== 'idle'

  const shownProducts = isSearchMode
    ? search.results
    : selectedCategory === ALL
      ? placeholderProducts
      : placeholderProducts.filter((product) => product.category === selectedCategory)

  const renderGrid = (products) => (
    <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(({ id, ...product }) => (
        <li key={id}>
          <ProductCard
            {...product}
            saved={savedIds.includes(id)}
            onSave={() => toggleSaved({ id, ...product })}
            comparing={compareIds.includes(id)}
            compareDisabled={compareFull && !compareIds.includes(id)}
            onCompare={() => toggleCompare({ id, ...product })}
            categoryActive={!isSearchMode && product.category === selectedCategory}
            onCategoryClick={() => showCategory(product.category)}
          />
        </li>
      ))}
    </ul>
  )

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop">
      <h1 className="font-display text-xl font-normal leading-tight text-fg">Browse</h1>
      <p className="mt-3 text-lg text-muted">Clean products picked for your home and family.</p>

      <div className="mt-6">
        <SearchBar
          value={searchText}
          onChange={(text) => (text === '' ? clearSearch() : setSearchText(text))}
          onSubmit={runSearch}
          isSearching={search.status === 'searching'}
        />
      </div>

      {!isSearchMode && (
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
      )}

      <h2 className="sr-only">{isSearchMode ? 'Search results' : 'Products'}</h2>

      <div aria-live="polite">
        {search.status === 'searching' && (
          <p className="mt-8 text-base text-muted">Searching Open Beauty Facts…</p>
        )}

        {search.status === 'done' && search.results.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-base text-muted">
              {search.results.length} results for “{search.query}”
            </p>
            <button type="button" onClick={clearSearch} className={ghostButton}>
              Clear search
            </button>
          </div>
        )}
      </div>

      {search.status === 'error' && (
        <div className="mt-8">
          <EmptyState
            title="Search isn't working right now"
            message="Open Beauty Facts didn't respond. Check your connection and try again."
            actionLabel="Try again"
            onAction={runSearch}
          />
        </div>
      )}

      {search.status === 'done' && search.results.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title={`No products found for “${search.query}”`}
            message="Try a simpler term, like a product type or brand."
            actionLabel="Clear search"
            onAction={clearSearch}
          />
        </div>
      )}

      {search.status === 'done' && search.results.length > 0 && renderGrid(shownProducts)}

      {!isSearchMode &&
        (shownProducts.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No products in this category yet."
              message={`We're still finding clean ${selectedCategory.toLowerCase()} products.`}
              actionLabel="Show all products"
              onAction={() => setSelectedCategory(ALL)}
            />
          </div>
        ) : (
          renderGrid(shownProducts)
        ))}

      {compareList.length > 0 && (
        <CompareTray products={compareList} max={maxCompare} onRemove={toggleCompare} onClear={clearCompare} />
      )}
    </main>
  )
}

export default BrowsePage
