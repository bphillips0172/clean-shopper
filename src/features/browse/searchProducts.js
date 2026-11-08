// Searches Open Beauty Facts (US edition) and turns its products into ProductCard props.
// No account or key is needed. Their guidance is about 10 searches a minute per user.
const SEARCH_URL = 'https://us.openbeautyfacts.org/cgi/search.pl'
const FIELDS = 'code,product_name,brands,image_front_small_url,categories_tags,labels_tags,ingredients_text'

// Tags that say nothing useful about the product.
const IGNORED_TAGS = new Set([
  'non-food-products',
  'open-beauty-facts',
  'incorrect-product-type',
  'cosmetic-products',
  'green-dot',
  'triman',
])

const FRAGRANCE = /\b(parfum|fragrance)\b/i

// Labels whose usual spelling isn't sentence case.
const KNOWN_LABELS = {
  'usda-organic': 'USDA Organic',
  'ewg-verified': 'EWG Verified',
  'b-corporation': 'B Corp',
  'cruelty-free': 'Cruelty Free',
  'leaping-bunny': 'Leaping Bunny',
}

// "en:mineral-sunscreens" -> "Mineral sunscreens"
function tagLabel(tag) {
  const known = KNOWN_LABELS[tag.slice(3).toLowerCase()]
  if (known) return known
  const words = tag.replace(/^[a-z]{2}:/, '').replace(/-/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase()
}

function usefulTags(tags = []) {
  return tags
    .filter((tag) => tag.startsWith('en:'))
    .filter((tag) => {
      const name = tag.slice(3).toLowerCase()
      return !IGNORED_TAGS.has(name) && !name.startsWith('made-in')
    })
    .map(tagLabel)
}

// Made-up placeholder score until a real ingredient-safety source exists. It is stable per
// product (seeded from the barcode) and nudged by what we do know: fragrance lowers it,
// a missing ingredient list lowers it, certifications raise it.
function placeholderCleanScore({ code, hasFragrance, hasIngredients, certificationCount }) {
  const seed = [...code].reduce((sum, digit) => sum + Number(digit || 0), 0)
  let score = 70 + (seed % 16)
  if (hasFragrance) score -= 20
  if (!hasIngredients) score -= 10
  score += Math.min(certificationCount, 2) * 6
  return Math.max(30, Math.min(98, score))
}

function toCardProps(product) {
  const ingredients = product.ingredients_text?.trim() ?? ''
  const hasFragrance = FRAGRANCE.test(ingredients)
  const certifications = usefulTags(product.labels_tags)

  let reason
  if (!ingredients) reason = 'No ingredient list on file yet, so we can’t check it.'
  else if (!hasFragrance) reason = 'No fragrance in the listed ingredients.'

  return {
    id: product.code,
    name: product.product_name.trim(),
    brand: product.brands?.split(',')[0].trim() || 'Unknown brand',
    category: 'Personal care',
    subcategory: usefulTags(product.categories_tags).at(-1),
    cleanScore: placeholderCleanScore({
      code: product.code,
      hasFragrance,
      hasIngredients: ingredients !== '',
      certificationCount: certifications.length,
    }),
    certifications,
    reason,
    avoidedIngredient: hasFragrance ? 'fragrance' : undefined,
    imageUrl: product.image_front_small_url,
  }
}

export async function searchProducts(query) {
  const params = new URLSearchParams({
    search_terms: query,
    search_simple: '1',
    json: '1',
    page_size: '24',
    fields: FIELDS,
  })

  const response = await fetch(`${SEARCH_URL}?${params}`)
  if (!response.ok) throw new Error(`Open Beauty Facts returned ${response.status}`)

  const data = await response.json()
  return data.products.filter((product) => product.product_name?.trim()).map(toCardProps)
}
