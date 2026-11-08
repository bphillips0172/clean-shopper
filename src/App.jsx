import { useState } from 'react'
import ProductCard from './components/ProductCard.jsx'

// Placeholder products for previewing ProductCard.
const sampleProducts = [
  {
    id: 'all-purpose',
    name: 'Free & Clear All-Purpose Cleaner',
    brand: 'Branch Basics',
    category: 'Home · Cleaning',
    cleanScore: 94,
    certifications: ['EWG Verified', 'B Corp', 'Leaping Bunny', 'Cruelty Free'],
    reason: 'Fragrance-free and plant-based, with no ingredients on your avoid list. Safe around kids and pets.',
  },
  {
    id: 'shampoo',
    name: 'Unscented Gentle Baby Shampoo and Body Wash',
    brand: 'Earth Mama',
    category: 'Personal care · Kids',
    cleanScore: 88,
    certifications: ['EWG Verified', 'USDA Organic'],
    reason: 'Tear-free formula from a brand you trust.',
  },
  {
    id: 'dish-soap',
    name: 'Lavender Dish Soap',
    brand: 'Mrs. Meyer’s',
    category: 'Home · Kitchen',
    cleanScore: 61,
    certifications: ['Leaping Bunny'],
    reason: 'Cuts grease well, but scores lower on ingredient safety.',
    avoidedIngredient: 'fragrance',
  },
]

function App() {
  const [savedIds, setSavedIds] = useState(['shampoo'])

  const toggleSaved = (id) =>
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop">
      <h1 className="font-display text-xl font-[360] leading-[1.14] tracking-[0.32px] text-fg">
        ProductCard preview
      </h1>
      <h2 className="mt-3 text-lg text-muted">Recommended for you</h2>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map(({ id, ...product }) => (
          <li key={id}>
            <ProductCard {...product} saved={savedIds.includes(id)} onSave={() => toggleSaved(id)} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
