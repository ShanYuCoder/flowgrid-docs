# Playwright を用いたビジュアルテストのエンジニアリング手法

本ガイドでは、高額な商用 SaaS ツール（Applitools など）と同等のビジュアルテスト効果の約 90% を、純粋なオープンソースの Playwright のみで実現し、ライセンス費用をかけずに UI レイアウトのデグレを撲滅する実践手法をまとめます。

---

## 1. 動的テキストの溢れとレイアウト崩れ防止 (動的マスキング技術)

従来のレイアウト回帰テストは主に `toHaveScreenshot()` に頼ってきました。しかし、Web 画面上のデータは頻繁に変化する（タイムスタンプ、テーブル値、アバター画像など）ため、単純なピクセル比較では偽陽性（フレーキーテスト）が頻発します。

**マスキング戦略：**
スクリーンショットを撮影する前に、Playwright で動的要素を特定して単色マスクで覆い、比較対象を純粋なレイアウト骨格のみに限定します。

```javascript
// ページ全体の無差別ピクセル比較を避ける：
// await expect(page).toHaveScreenshot('dashboard.png');

// 対象を絞り込んだマスキング比較を実行：
await expect(page).toHaveScreenshot('dashboard.png', {
  // アバター、動的日時、テーブルのデータセルをマスク
  mask: [
    page.locator('img.avatar'), 
    page.locator('.dynamic-date-time'),
    page.locator('table tbody td')
  ],
  maskColor: '#FF00FF', // 視認性の高いハイコントラスト色
  maxDiffPixels: 150    // OS ごとのフォントレンダリング差を許容する閾値
});
```

---

## 2. モバイル画面の意図しない横スクロール検知 (Scroll Leak)

典型的な UI 不具合として、CSS での `width: 100vw` の誤用や幅制限のない Flex コンテナによって、スマートフォン画面で不要な横スクロールが発生するケースがあります。画像比較ではこれを検知しにくいため、**DOM の幾何計測** を用います。

**DOM 幾何はみ出し検証：**
```javascript
test('モバイル表示で横スクロールが発生していないことを確認', async ({ page }) => {
  // 1. iPhone 13 の画面サイズをエミュレート
  await page.setViewportSize({ width: 390, height: 844 });
  
  // 2. 業務操作シナリオを実行...
  
  // 3. ビューポートの DOM 幾何サイズを計測
  const isOverflowing = await page.evaluate(() => {
    // scrollWidth が window.innerWidth を超えている場合は横スクロールが発生している
    return document.documentElement.scrollWidth > window.innerWidth;
  });

  // はみ出しがあればテスト失敗
  expect(isOverflowing).toBe(false); 
});
```

---

## 3. 要素の重なりと間隔崩れ検知

不適切な `position: absolute` でボタン同士が重なったり、コンテナの縮小でボタンの間隔が押しつぶされたりした場合、バウンディングボックスの交差判定アルゴリズムにより確実に検出できます。

**座標交差アルゴリズム (Bounding Box Intersection)：**
`visual-helpers.ts` に共通ヘルパーを作成します：

```javascript
// visual-helpers.ts
export async function expectNotOverlapping(locatorA, locatorB) {
  const boxA = await locatorA.boundingBox();
  const boxB = await locatorB.boundingBox();
  
  const isOverlapping = !(
    boxA.x + boxA.width <= boxB.x ||  // A が B より完全に左側
    boxB.x + boxB.width <= boxA.x ||  // B が A より完全に左側
    boxA.y + boxA.height <= boxB.y || // A が B より完全に上側
    boxB.y + boxB.height <= boxA.y    // B が A より完全に上側
  );
  
  expect(isOverlapping).toBe(false);
}

// 実際のテストコード：
test('キャンセルボタンと保存ボタンが重なっていないことを確認', async ({ page }) => {
  await expectNotOverlapping(page.locator('#btn-cancel'), page.locator('#btn-save'));
});
```

---

## 4. テキストの溢れとはみ出し防止

長いテキスト文字列がコンテナ幅を超えた際、自動折り返しや三点リーダー (`...`) による省略が設定されていないと、親コンテナを突き破ってレイアウトを破壊します。

**親子バウンディングボックス比較：**
```javascript
test('タイトルテキストが親カードコンテナからはみ出していないことを確認', async ({ page }) => {
  const parentBox = await page.locator('.card-container').boundingBox();
  const childBox = await page.locator('.card-container .long-title').boundingBox();
  
  // 子要素の幅が親コンテナの幅以下に収まっていることを検証
  expect(childBox.width).toBeLessThanOrEqual(parentBox.width);
});
```

---

## 運用のまとめ

高額な外部 SaaS を導入することなく、QA とフロントエンドエンジニアがこれらの検証手法を社内共通ライブラリ **`Playwright Visual Helpers`** として整備しておくことで、`flowgrid testcase:gen` の実行時に AI Agent が自動的にテストスイートへ組み込み、ライセンスコストゼロで UI 崩れを確実に自動検知できます。
