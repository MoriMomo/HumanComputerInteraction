(async () => {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        console.log('Navigating to product page...');
        await page.goto('http://localhost:3000/products/cardholder-pro', { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log('Waiting for Add to Cart button...');
        await page.getByRole('button', { name: 'Add to Cart' }).waitFor({ timeout: 60000 });

        console.log('Clicking Add to Cart...');
        await page.getByRole('button', { name: 'Add to Cart' }).click({ force: true, timeout: 60000 });

        await page.getByRole('button', { name: 'Added to Cart ✓' }).waitFor({ timeout: 60000 });

        const rawCart = await page.evaluate(() => window.localStorage.getItem('satset-cart-v1'));
        console.log('Local cart snapshot:', rawCart || 'empty');

        console.log('Going to cart page...');
        await page.goto('http://localhost:3000/cart', { waitUntil: 'domcontentloaded', timeout: 60000 });

        await page.getByText('Ready to checkout.').waitFor({ timeout: 60000 });
        await page.getByText('CardHolder Pro').waitFor({ timeout: 60000 });

        const count = await page.locator('text=CardHolder Pro').count();
        console.log('Cart contains CardHolder Pro:', count > 0);
        if (count > 0) process.exit(0);
        process.exit(2);
    } catch (err) {
        console.error('Error during check:', err);
        process.exit(3);
    } finally {
        await browser.close();
    }
})();
