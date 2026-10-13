# Visual Testing Engineering with Playwright

This guide synthesizes engineering techniques to achieve up to 90% visual testing efficacy with pure open-source Playwright compared to expensive SaaS tools like Applitools, eliminating UI layout regressions without third-party licensing costs.

---

## 1. Dynamic Text Overflow & Broken Layouts (Dynamic Masking)

Layout regressions are traditionally captured using `toHaveScreenshot()`. However, because web application data changes constantly (timestamps, tables, user avatars), raw pixel-by-pixel comparisons frequently yield false positives (flakiness).

**Masking Strategy:**
Prior to taking a screenshot, Playwright locates all dynamic elements and applies a solid mask over them, restricting comparison strictly to pure layout structure.

```javascript
// Instead of blind full-page comparison:
// await expect(page).toHaveScreenshot('dashboard.png');

// Direct Playwright with targeted masks:
await expect(page).toHaveScreenshot('dashboard.png', {
  // Mask avatars, dynamic timestamps, and tabular cell content
  mask: [
    page.locator('img.avatar'), 
    page.locator('.dynamic-date-time'),
    page.locator('table tbody td')
  ],
  maskColor: '#FF00FF', // High-contrast mask color for clarity
  maxDiffPixels: 150    // Modest threshold for OS font anti-aliasing differences
});
```

---

## 2. Responsive Mobile Horizontal Overflow (Scroll Leak)

A classic defect occurs when CSS misuses `width: 100vw` or unconstrained containers, creating unwanted horizontal scrolling on mobile viewports. Pixel diffing is inefficient at catching this; use **DOM geometry measurements** instead.

**DOM Overflow Check:**
```javascript
test('Verify mobile viewport does not leak horizontal scroll', async ({ page }) => {
  // 1. Emulate iPhone 13 viewport
  await page.setViewportSize({ width: 390, height: 844 });
  
  // 2. Execute scenario interactions...
  
  // 3. Evaluate viewport DOM geometry
  const isOverflowing = await page.evaluate(() => {
    // scrollWidth exceeding window innerWidth indicates horizontal overflow
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  // Fails if CSS allows overflow
  expect(isOverflowing).toBe(false); 
});
```

---

## 3. Element Overlaps and Spacing Regression

When buttons overlap due to improper `position: absolute` or drift apart due to collapsed flexbox containers, bounding box intersection algorithms detect the defect reliably.

**Bounding Box Coordinate Intersection:**
Create a reusable helper in `visual-helpers.ts`:

```javascript
// visual-helpers.ts
export async function expectNotOverlapping(locatorA, locatorB) {
  const boxA = await locatorA.boundingBox();
  const boxB = await locatorB.boundingBox();
  
  const isOverlapping = !(
    boxA.x + boxA.width <= boxB.x ||  // A is entirely left of B
    boxB.x + boxB.width <= boxA.x ||  // B is entirely left of A
    boxA.y + boxA.height <= boxB.y || // A is entirely above B
    boxB.y + boxB.height <= boxA.y    // B is entirely above A
  );
  
  expect(isOverlapping).toBe(false);
}

// In actual test suite:
test('Ensure Cancel and Save buttons do not overlap', async ({ page }) => {
  await expectNotOverlapping(page.locator('#btn-cancel'), page.locator('#btn-save'));
});
```

---

## 4. Text Truncation & Ellipsis Containment

When text strings exceed container bounds, instead of wrapping or cleanly truncating with ellipsis (`...`), unconstrained text may overflow its parent container.

**Parent-Child Box Comparison:**
```javascript
test('Ensure title text does not overflow parent card container', async ({ page }) => {
  const parentBox = await page.locator('.card-container').boundingBox();
  const childBox = await page.locator('.card-container .long-title').boundingBox();
  
  // Child element width must remain within parent container bounds
  expect(childBox.width).toBeLessThanOrEqual(parentBox.width);
});
```

---

## Operational Summary

Instead of licensing external tools, QA and FE engineers can package these techniques into an internal **`Playwright Visual Helpers`** utility. When `flowgrid testcase:gen` runs, the AI agent automatically imports these helpers into test suites, establishing an automated net that catches 99% of complex UI defects with zero license overhead.
