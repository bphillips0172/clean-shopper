/* global process */
import { expect, test } from '@playwright/test'

// A shopper's path through the app, with a screenshot at each step.
// It searches the live Open Beauty Facts database, so it needs internet and is skipped by
// `npm test`. Run it with: npm run walkthrough
test.skip(!process.env.WALKTHROUGH, 'Set WALKTHROUGH=1 to run the shopper walkthrough')

test('a shopper browses, searches, fills a cart and checks out', async ({ page }, testInfo) => {
  const dir = `test-results/walkthrough/${testInfo.project.name}`
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
  await shot('cart', `${await page.getByRole('article').count()} products shown; ${await page.locator('main p').first().textContent()}`)

  // 8. Go to checkout
  await page.getByRole('link', { name: 'Proceed to checkout' }).click()
  await expect(page).toHaveURL('/checkout')
  await shot('checkout', `${await page.locator('main li').count()} rows`)

  // 9. Fill in the send-my-list form
  await page.getByLabel('Your name').fill('Jordan Rivera')
  await page.getByLabel('Email address').fill('jordan@example.com')
  await page.getByRole('button', { name: 'Send my list' }).scrollIntoViewIfNeeded()
  await shot('checkout-form-filled')

  // 10. Send it
  await page.getByRole('button', { name: 'Send my list' }).click()
  await shot('checkout-sent', await page.getByRole('heading', { level: 1 }).textContent())

  // 11. Head back to the cart afterwards
  await page.getByRole('link', { name: 'Back to cart' }).click()
  await shot('cart-after-sending', `${await page.getByRole('article').count()} products still in cart`)

  // 12. Try dark mode
  await page.getByRole('switch', { name: 'Dark mode' }).click()
  await shot('dark-mode')

  await testInfo.attach('notes', { body: notes.join('\n'), contentType: 'text/plain' })
  console.log(`\n[${testInfo.project.name}]\n${notes.join('\n')}`)
})
