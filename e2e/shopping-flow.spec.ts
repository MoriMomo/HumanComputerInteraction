import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('should be able to navigate to a product, add to cart, and view cart', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Ensure homepage loaded
    await expect(page.locator('h1').first()).toBeVisible();

    // Navigate to products page
    await page.goto('/products');
    await expect(page.locator('h1', { hasText: 'Every detail,' }).first()).toBeVisible();

    // Click on a product
    await page.goto('/products/cardholder-pro');
    await expect(page.locator('h1', { hasText: 'CardHolder Pro' }).first()).toBeVisible();

    // Verify Reviews component is visible
    await expect(page.locator('text=Verified reviews')).toBeVisible();

    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    // Verify toast/button state change
    await expect(page.getByRole('button', { name: 'Added to Cart ✓' }).first()).toBeVisible();

    // Navigate to cart
    await page.goto('/cart');

    // Verify cart page
    await expect(page.locator('h1:has-text("Ready to checkout.")')).toBeVisible();
    await expect(page.locator('text=CardHolder Pro')).toBeVisible();
    await expect(page.locator('text=Total')).toBeVisible();
  });

  test('should display recently viewed products', async ({ page }) => {
    // Go to first product
    await page.goto('/products/cardholder-pro');
    await expect(page.locator('h1', { hasText: 'CardHolder Pro' }).first()).toBeVisible();

    // Go to second product
    await page.goto('/products/wallet-elite');
    await expect(page.locator('h1', { hasText: 'Wallet Elite' }).first()).toBeVisible();

    // Verify "Recently Viewed" section shows the first product
    await expect(page.locator('h2', { hasText: 'Recently Viewed.' })).toBeVisible();
    const recentlyViewedProduct = page.locator('p', { hasText: 'CardHolder Pro' }).last();
    await expect(recentlyViewedProduct).toBeVisible();

    // Go to a third product
    await page.goto('/products/desk-organizer');
    await expect(page.locator('h1', { hasText: 'Desk Organizer' }).first()).toBeVisible();

    // Verify "Recently Viewed" section shows the first and second products
    await expect(page.locator('text=Recently Viewed.')).toBeVisible();
    await expect(page.locator('text=CardHolder Pro').last()).toBeVisible();
    await expect(page.locator('text=Wallet Elite').last()).toBeVisible();
  });
});
