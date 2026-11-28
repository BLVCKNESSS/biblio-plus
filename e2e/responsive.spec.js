// e2e/responsive.spec.js
import { test, expect } from '@playwright/test'

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablette', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const pages = [
  { name: 'accueil', path: '/' },
  { name: 'catalogue', path: '/catalogue' },
  { name: 'contact', path: '/contact' },
]

for (const p of pages) {
  for (const vp of viewports) {
    test(`${p.name} sans défilement horizontal – ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(p.path)
      await page.waitForLoadState('networkidle')

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(overflow).toBe(false)

      await page.screenshot({ path: `captures/${p.name}-${vp.name}.png`, fullPage: true })
    })
  }
}

test('menu burger : présent et fonctionnel sur mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Navigation principale' })
  const toggle = page.getByRole('button', { name: 'Menu' })

  await expect(toggle).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Catalogue' })).toBeHidden()
  await toggle.click()
  await expect(nav.getByRole('link', { name: 'Catalogue' })).toBeVisible()
})

test('menu burger : absent sur ordinateur, navigation visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Navigation principale' })

  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden()
  await expect(nav.getByRole('link', { name: 'Catalogue' })).toBeVisible()
})
