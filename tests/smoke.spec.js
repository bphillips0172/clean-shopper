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
