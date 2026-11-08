import { Link, useNavigate } from 'react-router'
import EmptyState from '../../components/EmptyState.jsx'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone py-section-phone sm:px-container-tablet sm:py-section-tablet lg:px-container-desktop lg:py-section-desktop'

const focusRing = 'focus-visible:outline-none focus-visible:shadow-focus-ring'
const smallButton = `inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-display text-sm leading-body transition-all duration-base ease-standard cursor-pointer ${focusRing}`

const certificationCount = (product) => product.certifications?.length ?? 0

// Picks the product to recommend. Skips anything with an avoided ingredient (fragrance, until
// saved preferences exist), then prefers the highest clean score, then the most certifications.
function recommend(products) {
  const avoidFree = products.filter((product) => !product.avoidedIngredient)
  const pool = avoidFree.length > 0 ? avoidFree : products
  const pick = [...pool].sort(
    (a, b) => (b.cleanScore ?? 0) - (a.cleanScore ?? 0) || certificationCount(b) - certificationCount(a),
  )[0]

  const score = pick.cleanScore ?? 0
  const topScore = Math.max(...products.map((product) => product.cleanScore ?? 0))

  if (avoidFree.length === 0) {
    return {
      pick,
      why: `Every product here contains an ingredient you avoid, so this is simply the highest clean score (${score}/100).`,
    }
  }

  const reasons = []
  if (avoidFree.length < products.length) reasons.push('it has nothing on your avoid list')
  reasons.push(score === topScore ? `it has the highest clean score here (${score}/100)` : `its clean score is ${score}/100`)
  const certs = certificationCount(pick)
  if (certs > 0) reasons.push(`it carries ${certs} certification${certs === 1 ? '' : 's'}`)

  const sentence = reasons.length > 1 ? `${reasons.slice(0, -1).join(', ')} and ${reasons.at(-1)}` : reasons[0]
  return { pick, why: `We picked it because ${sentence}.` }
}

function CheckIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l4.5 4.5L19 7" />
    </svg>
  )
}

const rows = [
  {
    label: 'Price',
    render: (p) => (p.price != null ? <span className="font-display text-base text-fg">${p.price.toFixed(2)}</span> : <span className="text-muted">Not listed</span>),
  },
  {
    label: 'Clean score',
    render: (p) =>
      p.cleanScore != null ? (
        <span className="flex items-center gap-2 text-fg">
          <span className="size-2 shrink-0 rounded-pill bg-success" aria-hidden="true" />
          {p.cleanScore}/100
        </span>
      ) : (
        <span className="text-muted">No score yet</span>
      ),
  },
  {
    label: 'Avoided ingredients',
    render: (p) => (p.avoidedIngredient ? <span className="text-warn">Contains {p.avoidedIngredient}</span> : <span className="text-fg">None</span>),
  },
  {
    label: 'Certifications',
    render: (p) =>
      certificationCount(p) > 0 ? (
        <ul className="flex flex-col gap-1 text-fg">
          {p.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      ) : (
        <span className="text-muted">None listed</span>
      ),
  },
  {
    label: 'Category',
    render: (p) => <span className="text-fg">{p.subcategory ? `${p.category}, ${p.subcategory}` : p.category}</span>,
  },
  {
    label: 'Why it fits',
    render: (p) => <span className="leading-body text-muted">{p.reason ?? '—'}</span>,
  },
]

function ComparePage({ products = [], toggleCompare = () => {}, savedIds = [], toggleSaved = () => {} }) {
  const navigate = useNavigate()

  if (products.length < 2) {
    return (
      <main className={container}>
        <h1 className="font-display text-xl font-normal leading-tight text-fg">Compare products</h1>
        <div className="mt-8">
          <EmptyState
            title="Pick at least two products to compare"
            message={
              products.length === 1
                ? `You’ve picked ${products[0].name}. Add one or two more with Compare on Browse.`
                : 'Use Compare on any product in Browse or search results.'
            }
            actionLabel="Browse products"
            onAction={() => navigate('/browse')}
          />
        </div>
      </main>
    )
  }

  const { pick, why } = recommend(products)
  const cell = 'pr-4 align-top text-sm last:pr-0'

  return (
    <main className={container}>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/browse" className={`rounded-md transition-colors duration-fast ease-standard hover:text-fg ${focusRing}`}>
              Browse
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="text-fg">
            Compare
          </li>
        </ol>
      </nav>

      <h1 className="font-display text-xl font-normal leading-tight text-fg">Compare products</h1>
      <p className="mt-3 text-lg leading-body text-muted">
        {products.length} products side by side, checked against your avoid list.
      </p>

      <section aria-labelledby="our-pick" className="mt-8 flex flex-col gap-2 rounded-md border border-border bg-surface p-6 shadow-raised">
        <p className="flex items-center gap-2 text-sm font-medium text-muted">
          <span className="size-2 rounded-pill bg-success" aria-hidden="true" />
          Our pick
        </p>
        <h2 id="our-pick" className="font-display text-lg font-normal leading-tight text-fg">
          {pick.name} <span className="text-muted">· {pick.brand}</span>
        </h2>
        <p className="text-base leading-body text-muted">{why}</p>
      </section>

      <table className="mt-10 w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Side-by-side comparison</caption>
        <thead>
          <tr>
            {products.map((product) => (
              <th key={product.id} scope="col" className={`${cell} pb-4 font-normal`}>
                <span className="block font-display text-base leading-tight text-fg">{product.name}</span>
                <span className="mt-1 block text-muted">{product.brand}</span>
                {product.id === pick.id && (
                  <span className="mt-2 inline-flex rounded-pill bg-fg px-3 py-1 text-sm font-medium text-bg">Our pick</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {rows.map((row) => (
          <tbody key={row.label} className="border-t border-border">
            <tr>
              <th scope="rowgroup" colSpan={products.length} className="pt-4 pb-2 text-sm font-medium text-muted">
                {row.label}
              </th>
            </tr>
            <tr>
              {products.map((product) => (
                <td key={product.id} className={`${cell} pb-4`}>
                  {row.render(product)}
                </td>
              ))}
            </tr>
          </tbody>
        ))}

        <tbody className="border-t border-border">
          <tr>
            {products.map((product) => {
              const inCart = savedIds.includes(product.id)
              return (
                <td key={product.id} className={`${cell} pt-5`}>
                  <div className="flex flex-col items-start gap-2">
                    <button
                      type="button"
                      aria-pressed={inCart}
                      onClick={() => toggleSaved(product)}
                      className={`${smallButton} ${inCart ? 'border-fg bg-transparent text-fg hover:bg-surface-warm' : 'border-transparent bg-fg text-bg hover:opacity-90'}`}
                    >
                      {inCart && <CheckIcon />}
                      {inCart ? 'In cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(product)}
                      aria-label={`Remove ${product.name} from comparison`}
                      className={`rounded-pill px-2 py-1 text-sm text-muted transition-colors duration-fast ease-standard cursor-pointer hover:text-fg ${focusRing}`}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default ComparePage
