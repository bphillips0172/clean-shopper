/* global process */
import { expect, test } from '@playwright/test'

// A shopper's path through the app, with a screenshot at each step.
// It searches the live Open Beauty Facts database, so it needs internet and is skipped by
// `npm test`. Run it with: npm run walkthrough
test.skip(!process.env.WALKTHROUGH, 'Set WALKTHROUGH=1 to run the shopper walkthrough')

test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

test('a shopper browses, searches, fills a cart and checks out', async ({ page }, testInfo) => {
  const dir = `walkthrough-screenshots/${testInfo.project.name}`
  let step = 0
  const notes = []
  const shot = async (name, note) => {
    step += 1
    const file = `${dir}/${String(step).padStart(2, '0')}-${name}.png`
    await page.screenshot({ path: file, fullPage: false })
    notes.push(`${step}. ${name}: ${note ?? ''}`)
  }
  const cartLink = page.getByRole('banner').getByRole('link', { name: /^Cart/ })

  // 1. Arrive on the home page
  await page.goto('/')
  await shot('home', await page.getByRole('heading', { level: 1 }).textContent())

  // 2. Go to Browse from the hero button
  await page.getByRole('link', { name: 'Start researching' }).click()
  await expect(page).toHaveURL('/browse')
  await shot('browse', `${await page.getByRole('article').count()} products`)

  // 3. Filter to Baby care
  await page.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: 'Baby care' }).click()
  await shot('filter-baby-care', `${await page.getByRole('article').count()} products`)

  // 4. Add the first baby product to the cart
  const firstCard = page.getByRole('article').first()
  const firstName = await firstCard.getByRole('heading').textContent()
  await firstCard.getByRole('button', { name: 'Add to cart' }).click()
  await firstCard.scrollIntoViewIfNeeded()
  await shot('added-baby-product', `${firstName}; header reads "${await cartLink.textContent()}"`)

  // 5. Search the live database
  await page.getByLabel('Search products').fill('sunscreen')
  await page.getByLabel('Search products').press('Enter')
  await expect(page.getByText(/results for/).or(page.getByText(/No products found|isn't working/))).toBeVisible({ timeout: 20000 })
  await page.waitForTimeout(800) // let product photos load
  await shot('search-sunscreen', (await page.getByText(/results for|No products found|isn't working/).first().textContent()) ?? '')

  // 6. Add a search result to the cart
  const resultCard = page.getByRole('article').first()
  const resultName = await resultCard.getByRole('heading').textContent()
  await resultCard.getByRole('button', { name: 'Add to cart' }).click()
  await resultCard.scrollIntoViewIfNeeded()
  await shot('added-search-result', `${resultName}; header reads "${await cartLink.textContent()}"`)

  // 7. Open the cart from the header
  await page.evaluate(() => window.scrollTo(0, 0))
  await cartLink.click()
  await expect(page).toHaveURL('/saved')
  const cartRows = page.locator('main ul > li')
  await shot('cart', `${await cartRows.count()} rows; ${await page.getByRole('complementary').innerText()}`.replace(/\n+/g, ' | '))

  // 8. Go to the email step
  await page.getByRole('link', { name: 'Email my cart' }).click()
  await expect(page).toHaveURL('/checkout')
  await shot('email-cart', `${await page.locator('main ul > li').count()} rows grouped by category`)

  // 9. Copy the list
  await page.getByRole('button', { name: 'Copy list' }).click()
  await expect(page.getByText(/Copied|Couldn’t copy/)).toBeVisible()
  await page.getByRole('button', { name: 'Copy list' }).scrollIntoViewIfNeeded()
  await shot('copied-list', await page.getByText(/Copied|Couldn’t copy/).textContent())

  // 10. Remove a product from the cart
  await page.getByRole('link', { name: 'Cart', exact: true }).first().click()
  await expect(page).toHaveURL('/saved')
  await page.getByRole('button', { name: /^Remove / }).first().click()
  await shot('removed-one', `${await cartRows.count()} row left; header reads "${await cartLink.textContent()}"`)

  // 11. Try dark mode
  await page.getByRole('switch', { name: 'Dark mode' }).click()
  await page.waitForTimeout(300) // let the color fade finish
  await shot('dark-mode')

  await testInfo.attach('notes', { body: notes.join('\n'), contentType: 'text/plain' })
  console.log(`\n[${testInfo.project.name}]\n${notes.join('\n')}`)
})
