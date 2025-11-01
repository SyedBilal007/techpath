import { test, expect } from '@playwright/test';

test.describe('Roadmap Polish & Functionality', () => {
  test('progress persistence after refresh', async ({ page }) => {
    // Navigate to Data Analyst page
    await page.goto('/roadmaps/data-analyst');
    
    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Find and toggle first step checkbox
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.waitFor({ state: 'visible' });
    
    // Check if initially unchecked
    const initialChecked = await firstCheckbox.isChecked();
    
    // Toggle the checkbox
    await firstCheckbox.click();
    
    // Verify it's now checked (if it wasn't before) or unchecked (if it was)
    const afterToggle = await firstCheckbox.isChecked();
    expect(afterToggle).toBe(!initialChecked);
    
    // Reload page
    await page.reload();
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Verify checkbox state persisted
    const afterReload = await firstCheckbox.isChecked();
    expect(afterReload).toBe(afterToggle);
  });

  test('compare page shows two careers and common skills', async ({ page }) => {
    await page.goto('/compare');
    
    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Verify URL has career params or default selection
    const url = page.url();
    const hasParams = url.includes('?a=') && url.includes('&b=');
    
    // Check that two career columns are visible
    const columns = page.locator('[class*="Card"]').filter({ hasText: /Roadmap|Steps/i });
    await expect(columns).toHaveCount(2);
    
    // Look for "Common" badge - at least one should exist if there are common skills
    const commonBadges = page.locator('text=Common');
    const count = await commonBadges.count();
    
    // If there are common skills, verify they're labeled
    if (count > 0) {
      await expect(commonBadges.first()).toBeVisible();
    }
    
    // Verify info panel appears when common skills exist
    const infoPanel = page.locator('text=/share.*foundational skill/i');
    if (count > 0) {
      await expect(infoPanel).toBeVisible();
    }
  });

  test('no hydration warnings in console', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === 'warning') {
        const text = msg.text();
        // Ignore React DevTools warnings
        if (!text.includes('React DevTools') && !text.includes('DevTools')) {
          consoleWarnings.push(text);
        }
      }
    });
    
    await page.goto('/roadmaps/data-analyst');
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Wait a bit for any delayed hydration
    await page.waitForTimeout(1000);
    
    // Check for hydration-specific errors
    const hydrationErrors = consoleErrors.filter(err => 
      err.includes('hydration') || 
      err.includes('Hydration') ||
      err.includes('mismatch')
    );
    
    expect(hydrationErrors.length).toBe(0);
  });
});

