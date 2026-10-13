# 使用 Playwright 进行视觉回归测试工程实践

本指南总结了仅使用开源 Playwright 达到昂贵商业 SaaS 工具（如 Applitools）约 90% 视觉测试效能的工程化技巧，在无需任何第三方授权采购成本的前提下，杜绝前端 UI 布局回归缺陷。

---

## 1. 动态文本溢出与布局撕裂 (动态遮罩技术)

传统的布局回归主要依赖 `toHaveScreenshot()`。然而，由于 Web 页面中的业务数据时刻在变化（时间戳、表格内容、用户头像），直接进行原始像素对比经常导致虚警误报 (Flakiness)。

**遮罩策略：**
在截图比对前，让 Playwright 找到所有动态数据元素并在其上方覆盖纯色遮罩，将比对范围严格限定于纯粹的排版布局骨架。

```javascript
// 避免盲目的全页面素对比：
// await expect(page).toHaveScreenshot('dashboard.png');

// 采用目标遮罩模式进行截图验证：
await expect(page).toHaveScreenshot('dashboard.png', {
  // 遮罩头像、动态时间戳以及表格数据单元格
  mask: [
    page.locator('img.avatar'), 
    page.locator('.dynamic-date-time'),
    page.locator('table tbody td')
  ],
  maskColor: '#FF00FF', // 高对比度遮罩颜色便于识别
  maxDiffPixels: 150    // 容忍轻微的操作系统字体抗锯齿渲染差异
});
```

---

## 2. 移动端响应式横向滚动条泄漏 (Scroll Leak)

常见的典型缺陷是：CSS 误用 `width: 100vw` 或缺乏约束的弹性容器，导致移动端视口出现意外的横向滚动。像素级比对很难抓住此类缺陷，直接测量 **DOM 几何边界** 更加精准高效。

**DOM 几何溢出检测：**
```javascript
test('验证移动端视口未泄漏横向滚动条', async ({ page }) => {
  // 1. 模拟 iPhone 13 视口
  await page.setViewportSize({ width: 390, height: 844 });
  
  // 2. 执行业务操作交互...
  
  // 3. 计算视口 DOM 几何尺寸
  const isOverflowing = await page.evaluate(() => {
    // scrollWidth 超过 window.innerWidth 即表明存在横向滚动泄漏
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  // 如果 CSS 导致溢出则测试失败
  expect(isOverflowing).toBe(false); 
});
```

---

## 3. 元素重叠与间距破坏

当按钮因不当的 `position: absolute` 发生挤压重叠，或者因 Flex 容器折叠导致控件间距错乱时，采用包围盒相交算法可以极高可靠性地捕获此类缺陷。

**包围盒坐标相交算法 (Bounding Box Intersection)：**
在 `visual-helpers.ts` 中封装可复用辅助工具：

```javascript
// visual-helpers.ts
export async function expectNotOverlapping(locatorA, locatorB) {
  const boxA = await locatorA.boundingBox();
  const boxB = await locatorB.boundingBox();
  
  const isOverlapping = !(
    boxA.x + boxA.width <= boxB.x ||  // A 完全在 B 左侧
    boxB.x + boxB.width <= boxA.x ||  // B 完全在 A 左侧
    boxA.y + boxA.height <= boxB.y || // A 完全在 B 上方
    boxB.y + boxB.height <= boxA.y    // B 完全在 A 上方
  );
  
  expect(isOverlapping).toBe(false);
}

// 在实际测试用例中调用：
test('确保取消与保存按钮绝不发生视觉重叠', async ({ page }) => {
  await expectNotOverlapping(page.locator('#btn-cancel'), page.locator('#btn-save'));
});
```

---

## 4. 文本截断与省略号保护

当长文本字符串超出容器宽度时，若未配置自动换行或省略号 (`...`)，未受控的文字可能会直接溢出父容器破坏排版。

**父子容器包围盒检测：**
```javascript
test('确保标题文本未溢出卡片父容器', async ({ page }) => {
  const parentBox = await page.locator('.card-container').boundingBox();
  const childBox = await page.locator('.card-container .long-title').boundingBox();
  
  // 子元素宽度必须严格小于等于父容器宽度
  expect(childBox.width).toBeLessThanOrEqual(parentBox.width);
});
```

---

## 工程化总结

无需采购昂贵的外部商业工具，QA 与前端工程师可以将上述技巧封装为内部工程库 **`Playwright Visual Helpers`**。当执行 `flowgrid testcase:gen` 时，AI Agent 会自动将这些断言引入测试套件，在零授权成本的前提下自动拦截绝大多数复杂的 UI 布局缺陷。
