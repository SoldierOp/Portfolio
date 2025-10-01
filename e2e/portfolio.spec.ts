import { test, expect } from '@playwright/test';

test.describe('Hyper-Realistic 3D Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    // Wait for the app to load
    await expect(page.locator('text=PORTFOLIO.EXE')).toBeVisible();
    
    // Wait for initialization to complete
    await expect(page.locator('[data-testid="canvas"]')).toBeVisible({ timeout: 10000 });
  });

  test('should display HUD navigation', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Check if navigation buttons are visible
    await expect(page.locator('text=LOBBY')).toBeVisible();
    await expect(page.locator('text=LOADOUT')).toBeVisible();
    await expect(page.locator('text=INVENTORY')).toBeVisible();
    await expect(page.locator('text=SCOREBOARD')).toBeVisible();
    await expect(page.locator('text=RADIO')).toBeVisible();
  });

  test('should navigate between scenes', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Test navigation to different scenes
    await page.click('text=LOADOUT');
    await expect(page.locator('text=LOADOUT')).toBeVisible();
    
    await page.click('text=INVENTORY');
    await expect(page.locator('text=INVENTORY')).toBeVisible();
    
    await page.click('text=SCOREBOARD');
    await expect(page.locator('text=SCOREBOARD')).toBeVisible();
    
    await page.click('text=RADIO');
    await expect(page.locator('text=RADIO')).toBeVisible();
    
    // Return to lobby
    await page.click('text=LOBBY');
    await expect(page.locator('text=LOBBY')).toBeVisible();
  });

  test('should open and close settings panel', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Open settings
    await page.click('text=⚙️');
    await expect(page.locator('text=SYSTEM SETTINGS')).toBeVisible();
    
    // Check if audio controls are present
    await expect(page.locator('text=AUDIO SYSTEM')).toBeVisible();
    await expect(page.locator('text=Master Volume')).toBeVisible();
    await expect(page.locator('text=SFX Volume')).toBeVisible();
    await expect(page.locator('text=Music Volume')).toBeVisible();
    
    // Check if accessibility controls are present
    await expect(page.locator('text=ACCESSIBILITY')).toBeVisible();
    await expect(page.locator('text=REDUCED MOTION')).toBeVisible();
    await expect(page.locator('text=HIGH CONTRAST')).toBeVisible();
    await expect(page.locator('text=LARGE TEXT')).toBeVisible();
    
    // Close settings by clicking the settings button again
    await page.click('text=⚙️');
    await expect(page.locator('text=SYSTEM SETTINGS')).not.toBeVisible();
  });

  test('should toggle audio settings', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Open settings
    await page.click('text=⚙️');
    
    // Test mute toggle
    const muteButton = page.locator('text=MUTE');
    await expect(muteButton).toBeVisible();
    
    await muteButton.click();
    await expect(page.locator('text=UNMUTE')).toBeVisible();
    
    await page.click('text=UNMUTE');
    await expect(page.locator('text=MUTE')).toBeVisible();
  });

  test('should toggle accessibility settings', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Open settings
    await page.click('text=⚙️');
    
    // Test reduced motion toggle
    const reducedMotionButton = page.locator('text=REDUCED MOTION: OFF');
    await expect(reducedMotionButton).toBeVisible();
    
    await reducedMotionButton.click();
    await expect(page.locator('text=REDUCED MOTION: ON')).toBeVisible();
    
    // Test high contrast toggle
    const highContrastButton = page.locator('text=HIGH CONTRAST: OFF');
    await expect(highContrastButton).toBeVisible();
    
    await highContrastButton.click();
    await expect(page.locator('text=HIGH CONTRAST: ON')).toBeVisible();
    
    // Test large text toggle
    const largeTextButton = page.locator('text=LARGE TEXT: OFF');
    await expect(largeTextButton).toBeVisible();
    
    await largeTextButton.click();
    await expect(page.locator('text=LARGE TEXT: ON')).toBeVisible();
  });

  test('should minimize and restore HUD', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Minimize HUD
    await page.click('text=⬇️');
    
    // Check if minimize button changed to restore
    await expect(page.locator('text=⬆️')).toBeVisible();
    
    // Restore HUD
    await page.click('text=⬆️');
    
    // Check if restore button changed back to minimize
    await expect(page.locator('text=⬇️')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check if first button is focused
    const firstButton = page.locator('text=LOBBY');
    await expect(firstButton).toBeFocused();
    
    // Test arrow key navigation
    await page.keyboard.press('ArrowRight');
    const secondButton = page.locator('text=LOADOUT');
    await expect(secondButton).toBeFocused();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Check if navigation is still visible
    await expect(page.locator('text=LOBBY')).toBeVisible();
    
    // Check if settings button is accessible
    await expect(page.locator('text=⚙️')).toBeVisible();
  });

  test('should handle WebGL errors gracefully', async ({ page }) => {
    // Mock WebGL context failure
    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(contextType) {
        if (contextType === 'webgl' || contextType === 'webgl2') {
          return null;
        }
        return originalGetContext.call(this, contextType);
      };
    });
    
    await page.goto('/');
    
    // Should still load with fallback
    await expect(page.locator('text=PORTFOLIO.EXE')).toBeVisible();
  });

  test('should maintain state across navigation', async ({ page }) => {
    await page.waitForSelector('[data-testid="canvas"]');
    
    // Open settings and change a setting
    await page.click('text=⚙️');
    await page.click('text=REDUCED MOTION: OFF');
    await expect(page.locator('text=REDUCED MOTION: ON')).toBeVisible();
    
    // Navigate to another scene
    await page.click('text=LOADOUT');
    
    // Return to lobby
    await page.click('text=LOBBY');
    
    // Open settings again and check if setting persisted
    await page.click('text=⚙️');
    await expect(page.locator('text=REDUCED MOTION: ON')).toBeVisible();
  });
});



