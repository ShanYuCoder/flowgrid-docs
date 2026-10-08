# Tuyệt kỹ Visual Testing Miễn phí 100% với Playwright

Tài liệu này tổng hợp "chất xám" (Engineering Logic) để ép Playwright thuần (Open Source) đạt hiệu quả Visual Testing lên đến 90% so với các tool đắt tiền như Applitools, giải quyết triệt để các lỗi giao diện "khù khoằm" mà không cần tốn tiền mua SaaS.

---

## 1. Trị lỗi Text tràn viền / Vỡ layout (Dynamic Masking)
Lỗi vỡ layout thường được bắt bằng hàm `toHaveScreenshot()`. Tuy nhiên, vì dữ liệu Web thay đổi liên tục (ngày giờ, bảng biểu, tên người dùng), nên việc chụp ảnh so sánh pixel rất dễ bị báo lỗi giả (Flaky).

**Kỹ thuật "Mặc áo tàng hình" (Masking):**
Trước khi chụp, Playwright sẽ tìm tất cả các phần tử chứa dữ liệu động và dán một miếng băng dính đen (Mask) lên đó. Lúc này, ảnh chụp chỉ còn lại cấu trúc Layout thuần tuý.

```javascript
// Thay vì chụp mù quáng:
// await expect(page).toHaveScreenshot('dashboard.png');

// Dùng chất xám để chỉ đạo Playwright:
await expect(page).toHaveScreenshot('dashboard.png', {
  // Che toàn bộ ảnh thẻ, ngày tháng, và các text nằm trong bảng dữ liệu
  mask: [
    page.locator('img.avatar'), 
    page.locator('.dynamic-date-time'),
    page.locator('table tbody td')
  ],
  maskColor: '#FF00FF', // Đổi màu mask thành hồng để dễ nhìn
  maxDiffPixels: 150    // Cho phép sai số nhỏ để khử răng cưa Font chữ giữa các HĐH
});
```

---

## 2. Trị lỗi Responsive dẫn đến Scroll ngang (Mobile)
Đây là lỗi kinh điển khi Code CSS dùng `width: 100vw` sai cách, làm màn hình điện thoại bị trượt ngang. Pixel-diffing không giỏi bắt lỗi này, ta dùng **DOM Math**.

**Kỹ thuật "Đo độ phình DOM":**
```javascript
test('Kiểm thử giao diện Mobile không bị phình scroll ngang', async ({ page }) => {
  // 1. Giả lập màn hình iPhone 13
  await page.setViewportSize({ width: 390, height: 844 });
  
  // 2. Chạy kịch bản...
  
  // 3. Tiêm JS xuống Browser để đo
  const isOverflowing = await page.evaluate(() => {
    // ScrollWidth lớn hơn Width thật của màn hình = Có thanh cuộn ngang
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  // Báo lỗi đỏ chót nếu Dev làm vỡ CSS
  expect(isOverflowing).toBe(false); 
});
```

---

## 3. Trị lỗi Element đè lên nhau (Overlap) hoặc cách quá xa
Khi 2 nút bấm nằm chèn lên nhau do CSS `position: absolute` sai, hoặc cách nhau 1000px do rớt Flexbox, ta dùng thuật toán Bounding Box.

**Kỹ thuật "Giao cắt Toạ độ" (Intersection):**
Bạn có thể tạo một file Helper dùng chung `visual-helpers.ts`:

```javascript
// visual-helpers.ts
export async function expectNotOverlapping(locatorA, locatorB) {
  const boxA = await locatorA.boundingBox();
  const boxB = await locatorB.boundingBox();
  
  const isOverlapping = !(
    boxA.x + boxA.width <= boxB.x ||  // A nằm hoàn toàn bên trái B
    boxB.x + boxB.width <= boxA.x ||  // B nằm hoàn toàn bên trái A
    boxA.y + boxA.height <= boxB.y || // A nằm hoàn toàn trên B
    boxB.y + boxB.height <= boxA.y    // B nằm hoàn toàn trên A
  );
  
  expect(isOverlapping).toBe(false);
}

// Trong file Test thực tế:
test('Đảm bảo nút Huỷ và nút Lưu không bị dính vào nhau', async ({ page }) => {
  await expectNotOverlapping(page.locator('#btn-cancel'), page.locator('#btn-save'));
});
```

---

## 4. Trị lỗi Text không rớt dòng (Text Truncation / Ellipsis)
Khi một Text quá dài, thay vì rớt dòng hoặc có dấu `...`, nó lại tràn ra khỏi thẻ DIV mẹ. 

**Kỹ thuật "So sánh Box Mẹ - Box Con":**
```javascript
test('Kiểm tra Text không bị tràn ra ngoài Card', async ({ page }) => {
  const parentBox = await page.locator('.card-container').boundingBox();
  const childBox = await page.locator('.card-container .long-title').boundingBox();
  
  // Chiều ngang của chữ phải nhỏ hơn hoặc bằng chiều ngang của Card mẹ
  expect(childBox.width).toBeLessThanOrEqual(parentBox.width);
});
```

## Tổng kết Vận hành
Thay vì mua Tool xịn, QA/Dev FE chỉ cần biến các kỹ thuật trên thành một thư viện **`Playwright Visual Helpers`** nội bộ. Khi `flowgrid testcase:gen` chạy, AI sẽ tự động import các helper này vào Testcase, tạo thành một tấm lưới lọc siêu cấp quét sạch 99% lỗi giao diện "khù khoằm" mà không mất một đồng phí License nào.
