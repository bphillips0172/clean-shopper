import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ProductCard from '../../components/ProductCard.jsx'

const container =
  'mx-auto max-w-[var(--container-max)] px-container-phone sm:px-container-tablet lg:px-container-desktop'

const sectionY = 'py-section-phone sm:py-section-tablet lg:py-section-desktop'

const focusRing = 'focus-visible:outline-none focus-visible:shadow-focus-ring'

// Full-size buttons from the spec, for the page's main calls to action.
const primaryButton = `inline-flex items-center gap-2 rounded-pill border-2 border-transparent bg-fg py-3 pl-4 pr-[26px] font-display text-base leading-body text-bg transition-all duration-base ease-standard hover:opacity-90 ${focusRing}`
const ghostButton = `inline-flex items-center gap-2 rounded-pill border-2 border-fg bg-transparent py-3 pl-4 pr-[26px] font-display text-base leading-body text-fg transition-all duration-base ease-standard hover:bg-fg hover:text-bg ${focusRing}`

const trustSources = ['EWG Skin Deep database', 'USDA Organic certification', 'EWG Verified', 'B Corp status', 'Made Safe certification']

const steps = [
  {
    title: 'Describe what you need',
    body: 'Tell Clean Shopper what you’re looking for — a floor cleaner safe around kids and pets, a fragrance-free laundry detergent, a dish soap with no hormone disruptors. No need to know the ingredient names.',
  },
  {
    title: 'Get scored recommendations',
    body: 'Clean Shopper researches options, evaluates every ingredient against clean standards, and returns a shortlist with a plain-language explanation of each one’s strengths and concerns.',
  },
  {
    title: 'Save and build your list',
    body: 'Add the products you like to your shopping list. Save your preferences — ingredients to avoid, trusted brands, certifications that matter — and Clean Shopper applies them to every future search.',
  },
]

const features = [
  {
    title: 'Product research',
    body: 'Describe what you’re looking for in plain language. Clean Shopper evaluates ingredients against EWG Skin Deep, flags concerns, and surfaces options with clear reasoning — not just ratings.',
    icon: (
      <>
        <circle cx="9" cy="9" r="6" />
        <path d="M14 14l3 3" />
      </>
    ),
  },
  {
    title: 'Side-by-side comparison',
    body: 'Compare products directly on any dimension that matters to you. Ingredient safety, certification status, fragrance-free status — filtered through your saved preferences, not generic criteria.',
    icon: <path d="M10 3v14M5 7h10M5 13h10" />,
  },
  {
    title: 'Preference management',
    body: 'Save the ingredients you avoid, the brands you trust, and the certifications that matter to you. Clean Shopper applies these automatically so you never have to repeat yourself.',
    icon: <path d="M4 10h12M4 6h8M4 14h6" />,
  },
  {
    title: 'Shopping list',
    body: 'Recommended products save to a list that persists across sessions. Build out your home, personal care, and pantry categories over time as you find products you trust.',
    icon: (
      <>
        <rect x="4" y="3" width="12" height="14" rx="2" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </>
    ),
  },
]

const exampleHighlights = [
  'Ingredient-by-ingredient EWG scores, not just a product average',
  'Flags for your personal avoid list highlighted in every result',
  'Plain-language explanation of what each rating means',
]

function ArrowIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function LandingPage() {
  const [exampleSaved, setExampleSaved] = useState(false)
  const navigate = useNavigate()

  return (
    <main>
      {/* Hero */}
      <section className={`${container} ${sectionY}`}>
        <p className="flex items-center gap-2 text-sm font-medium text-muted">
          <span className="size-2 rounded-pill bg-success" aria-hidden="true" />
          AI-powered ingredient research
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display text-2xl font-light leading-tight text-fg sm:text-3xl lg:text-4xl">
          Find products that are actually clean.
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-body text-muted">
          When you have kids and pets, what goes on floors, in laundry, and on skin actually matters. Clean Shopper researches
          ingredients so you don’t have to — filtered by your own preferences and verified against EWG’s Skin Deep database.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/browse" className={primaryButton}>
            Start researching
            <ArrowIcon />
          </Link>
          <a href="#how-it-works" className={ghostButton}>
            See how it works
          </a>
        </div>
      </section>

      {/* Trust bar */}
      <section aria-label="Sources we check against" className="border-y border-border bg-surface">
        <div className={`${container} flex flex-wrap items-center gap-x-5 gap-y-2 py-4`}>
          <p className="text-sm font-medium text-fg">Checks against</p>
          <ul className="flex flex-wrap gap-2">
            {trustSources.map((source) => (
              <li key={source} className="rounded-pill border border-border-soft px-3 py-1 text-sm text-muted">
                {source}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className={`${container} ${sectionY} scroll-mt-4`}>
        <p className="text-sm font-medium text-muted">How it works</p>
        <h2 className="mt-3 font-display text-xl font-normal leading-tight text-fg sm:text-2xl">Research in minutes, not hours</h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-body text-muted">
          Reading ingredient labels across a dozen products takes an afternoon. Clean Shopper handles the research so you can make a
          confident choice in minutes.
        </p>
        <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex size-8 items-center justify-center rounded-pill bg-surface-warm font-display text-lg text-fg" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="font-display text-lg font-normal leading-tight text-fg">{step.title}</h3>
              <p className="text-sm leading-body text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-surface">
        <div className={`${container} ${sectionY}`}>
          <p className="text-sm font-medium text-muted">Features</p>
          <h2 className="mt-3 font-display text-xl font-normal leading-tight text-fg sm:text-2xl">Everything you need to shop clean</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-body text-muted">
            Four tools designed around the real frustrations of ingredient research.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-3 rounded-md border border-border bg-bg p-6 shadow-raised">
                <span className="flex size-8 items-center justify-center rounded-md bg-surface-warm text-fg" aria-hidden="true">
                  <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    {feature.icon}
                  </svg>
                </span>
                <h3 className="font-display text-lg font-normal leading-tight text-fg">{feature.title}</h3>
                <p className="text-sm leading-body text-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Example recommendation */}
      <section className={`${container} ${sectionY} grid grid-cols-1 items-center gap-12 md:grid-cols-2`}>
        <div>
          <p className="text-sm font-medium text-muted">Example</p>
          <h2 className="mt-3 font-display text-xl font-normal leading-tight text-fg sm:text-2xl">What a recommendation looks like</h2>
          <p className="mt-4 text-base leading-body text-muted">
            Clean Shopper doesn’t just return a score. It shows you the ingredients that matter, flags the ones to watch, and surfaces
            certifications so you can make the call yourself.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {exampleHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-body text-muted">
                <svg className="mt-1 size-4 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l4.5 4.5L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ProductCard
          name="Branch Basics Concentrate"
          brand="Branch Basics"
          category="Home cleaning"
          subcategory="All-purpose"
          cleanScore={92}
          certifications={['EWG Verified', 'Made Safe', 'Fragrance Free']}
          reason="Plant-based concentrate with no ingredients on your avoid list. Safe around kids and pets."
          saved={exampleSaved}
          onSave={() => setExampleSaved((saved) => !saved)}
          onCategoryClick={() => navigate('/browse', { state: { category: 'Home cleaning' } })}
        />
      </section>

      {/* Closing call to action */}
      <section className="border-t border-border bg-surface">
        <div className={`${container} ${sectionY} flex flex-col items-center text-center`}>
          <h2 className="max-w-[22ch] font-display text-xl font-normal leading-tight text-fg sm:text-2xl">
            Protect your family. Stop reading ingredient labels.
          </h2>
          <p className="mt-4 max-w-[44ch] text-lg leading-body text-muted">
            Clean Shopper researches every product so the safest choice is also the easiest one.
          </p>
          <Link to="/browse" className={`${primaryButton} mt-8`}>
            Get started — it’s free
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className={`${container} flex flex-wrap items-center justify-between gap-3 py-8`}>
          <p className="font-display text-base text-fg">Clean Shopper</p>
          <p className="text-sm text-muted">A course demo project — not a real product (yet).</p>
        </div>
      </footer>
    </main>
  )
}

export default LandingPage
