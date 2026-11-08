import { expect, test } from '@playwright/test'

test('landing page links to browse, and adding to cart updates the header', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Find products that are actually clean.')

  await page.getByRole('link', { name: 'Start researching' }).click()
  await expect(page).toHaveURL('/browse')
  await expect(page.getByRole('article')).toHaveCount(6)

  await page.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: 'Baby care' }).click()
  await expect(page.getByRole('article')).toHaveCount(2)

  await page.getByRole('button', { name: 'Add to cart' }).first().click()
  await expect(page.getByRole('link', { name: /Cart/ })).toContainText('1')
})

test('the page never scrolls sideways', async ({ page }) => {
  for (const path of ['/', '/browse', '/saved', '/checkout']) {
    await page.goto(path)
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflows, `${path} scrolls sideways`).toBe(false)
  }
})

test('comparing products recommends one without avoided ingredients', async ({ page }) => {
  await page.goto('/browse')
  await page.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: 'Home cleaning' }).click()

  const compareButtons = page.getByRole('button', { name: 'Compare', exact: true })
  await compareButtons.nth(0).click() // Free & Clear All-Purpose Cleaner
  const tray = page.getByRole('region', { name: 'Products to compare' })
  await expect(tray).toContainText('Pick 1 more')
  await compareButtons.nth(0).click() // Lavender Dish Soap, which contains fragrance
  await expect(tray).toContainText('2 of 3')

  await tray.getByRole('link', { name: 'Compare now' }).click()
  await expect(page).toHaveURL('/compare')
  await expect(page.getByRole('heading', { name: /Free & Clear All-Purpose Cleaner/ })).toBeVisible()
  await expect(page.getByText('nothing on your avoid list')).toBeVisible()
})

test('only three products can be compared at once', async ({ page }) => {
  await page.goto('/browse')
  const compare = page.getByRole('button', { name: 'Compare', exact: true })
  for (let i = 0; i < 3; i++) await compare.first().click()
  await expect(page.getByRole('button', { name: 'Compare (3 max)' }).first()).toBeDisabled()
  await expect(page.getByRole('region', { name: 'Products to compare' })).toContainText('3 of 3')
})
