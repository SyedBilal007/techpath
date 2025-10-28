import { test, expect } from '@playwright/test';

test.describe('Data Analyst Roadmap', () => {
  test('should navigate from home to Data Analyst roadmap and display 6 steps', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the home page
    await expect(page).toHaveTitle(/TechPath/i);
    
    // Find and click the Data Analyst card
    // Look for the card with text "Data Analyst"
    const dataAnalystCard = page.locator('text=Data Analyst').locator('..').locator('..');
    await dataAnalystCard.first().click();
    
    // Wait for navigation to complete
    await page.waitForURL(/\/roadmaps\/data-analyst/);
    await page.waitForLoadState('networkidle');
    
    // Verify URL
    await expect(page).toHaveURL(/\/roadmaps\/data-analyst/);
    
    // Verify page title contains "Data Analyst"
    await expect(page).toHaveTitle(/Data Analyst.*Roadmap/i);
    
    // Verify that we have the roadmap content
    await expect(page.locator('h1, h2')).toContainText(/Data Analyst/i);
    
    // Count the steps - should be 6
    // The steps are rendered in "Learning Steps Overview" section
    const steps = page.locator('text=Learning Steps Overview').locator('../..').locator('div').filter({ hasText: /Step \d|Excel & Google Sheets|SQL Fundamentals|Python for Data|Visualization|Portfolio Projects|Job Prep/ }).first();
    
    // More reliable: find all step content by looking for the numbered badges
    const stepContainers = page.locator('div[class*="rounded-full"]').filter({ hasText: /^[1-6]$/ });
    
    // Wait for steps to be visible
    await expect(stepContainers.first()).toBeVisible();
    
    // Count the step numbers (1-6)
    const stepCount = await stepContainers.count();
    
    // Assert we have exactly 6 steps
    expect(stepCount).toBe(6);
    
    // Verify each step by checking the step names
    const expectedSteps = [
      'Excel & Google Sheets',
      'SQL Fundamentals',
      'Python for Data',
      'Visualization',
      'Portfolio Projects',
      'Job Prep'
    ];
    
    for (const stepName of expectedSteps) {
      const stepElement = page.locator('text=' + stepName).first();
      await expect(stepElement).toBeVisible();
    }
    
    // Verify the RoadmapGraph component is visible
    const roadmapGraph = page.locator('text=Interactive Learning Path').locator('..');
    await expect(roadmapGraph).toBeVisible();
  });
  
  test('should display progress tracking on roadmap page', async ({ page }) => {
    // Navigate directly to the roadmap page
    await page.goto('/roadmaps/data-analyst');
    await page.waitForLoadState('networkidle');
    
    // Verify progress ring exists
    const progressCard = page.locator('text=Your Progress').locator('..');
    await expect(progressCard).toBeVisible();
    
    // Verify it shows "0 of 6 steps completed"
    await expect(progressCard).toContainText('0 of 6 steps completed');
    
    // Verify completion percentage is visible
    const completionText = page.locator('text=/0 of 6/');
    await expect(completionText).toBeVisible();
  });
  
  test('should have copy and share buttons', async ({ page }) => {
    // Navigate to roadmap page
    await page.goto('/roadmaps/data-analyst');
    await page.waitForLoadState('networkidle');
    
    // Verify "Copy Roadmap" button exists
    const copyButton = page.locator('button:has-text("Copy Roadmap")');
    await expect(copyButton).toBeVisible();
    
    // Verify Twitter share button exists
    const twitterButton = page.locator('text=Twitter').locator('..').first();
    await expect(twitterButton).toBeVisible();
    
    // Verify LinkedIn share button exists
    const linkedinButton = page.locator('text=LinkedIn').locator('..').first();
    await expect(linkedinButton).toBeVisible();
    
    // Verify "Download as PDF" button exists
    const pdfButton = page.locator('button:has-text("Download as PDF")');
    await expect(pdfButton).toBeVisible();
  });
});

