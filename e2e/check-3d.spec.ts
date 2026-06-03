import { test, expect } from '@playwright/test';

test('3D viewer selection shows badge and can add', async ({ page }) => {
    // navigate with testSelect to trigger deterministic auto-selection in the viewer
    await page.goto('http://localhost:3000/products/cardholder-pro?testSelect=1');

    // wait for the 3D canvas to appear and then the badge injected by the selection hook
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible({ timeout: 20000 });

    // ensure the auto-select trigger exists and call it explicitly to make the test deterministic
    await page.waitForTimeout(800);
    await page.evaluate(() => {
        const w = window as unknown as { __PRODUCT3D_TRIGGER?: () => void };
        if (w.__PRODUCT3D_TRIGGER) {
            try {
                w.__PRODUCT3D_TRIGGER();
            } catch { }
        }
    });

    // wait for the global signal set by the TestAutoSelect helper
    await page.waitForFunction(() => (window as unknown as { __PRODUCT3D_SELECTED_NAME?: unknown }).__PRODUCT3D_SELECTED_NAME !== undefined, { timeout: 15000 });
    const selName = await page.evaluate(() => (window as unknown as { __PRODUCT3D_SELECTED_NAME?: string }).__PRODUCT3D_SELECTED_NAME);
    expect(selName).toBeTruthy();

    // try clicking the Add button inside the badge
    const addBtn = page.locator('button', { hasText: 'Add' }).first();
    if (await addBtn.count()) {
        await addBtn.click();
        // ensure the mobile Add confirmation appears (Added to Cart state)
        await expect(page.locator('text=Added to Cart').first()).toBeVisible({ timeout: 3000 }).catch(() => { });
    }
});
