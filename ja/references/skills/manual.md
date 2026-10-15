---
name: manual
description: "/manual — Generates End-User Documentation (User Manuals / Help Center guides) anchored on User Flows and E2E Evidences."
disable-model-invocation: true
extractBundle: spec-core
---

# `/manual` - ユーザーマニュアル生成スキル (User Manual Generation Skill)

本スキルは、エンドユーザー向けの包括的かつ完全非技術的な操作マニュアル（利用ガイド・ヘルプセンター記事）を生成します。画面の全項目を網羅するのではなく、特定のユースケースやタスクの完了を案内する**フロー中心設計（Flow-Centric）**を採用しています。

## 1. Frontmatter要件（Google Docs連携用）
生成される各Markdownファイルは、必ず先頭に以下のYAML Frontmatterブロックを含める必要があります。
```yaml
---
gdoc_id: "" # Populated by adapter
gdrive_image_id: "" # Populated by adapter
content_hash: "" # Populated by adapter
locale: "ja" # 対象ドキュメント言語 (BCP-47)
---
```

## 2. 多言語スコープと選択 (Multi-Language Scope & Selection)
1. **設定の確認:** `docs/ssot-docs.locale.yaml` を読み込み、対応ドキュメント言語リスト（`docsProseLocales`）およびデフォルト言語（`defaultDocsProseLocale`）を確認します。
2. **コマンドライン引数の確認:**
   - `--locale=all` が指定された場合: `docsProseLocales` の全言語向けマニュアルを一括生成します。
   - `--locale=<code >`（例: `--locale=ja`）が指定された場合: 指定言語向けのマニュアルのみを生成します。
3. **対話型プロンプト (`AskQuestion`):**
   - `--locale` 引数がなく、かつ複数言語が設定されている場合:
     メンバーに対話モーダルで確認します:
     > *"出力するマニュアルの言語を選択してください (Select User Manual language):"*
     > - `(Recommended) [All] すべての言語で生成する (${docsProseLocales.join(', ')})`
     > - `${locale_1}`
     > - `${locale_2}`
     > - ...
   - 単一言語設定の場合は、確認なしで自動的にその言語を対象とします。

## 3. コンテキスト収集 (Context Assembly)
`/manual <FLOW-ID>`（例: `/manual FLOW-ADM-TENANT-SETUP`）で呼び出された場合:
1. **対象の特定:** プライマリユーザーフロー文書（`FLOW-*`）を読み込みます。
2. **コンテキスト収集:** コンポーネント仕様書（`W-*`）から主要セクションの目的のみを把握します（詳細なバリデーション規則は除外）。
3. **テンプレート読込:** `surfaces/_user-manual-page.template.md` の標準マニュアルテンプレートを読み込みます。

## 4. スマートエビデンス連携（フォールバック階層）
Zipファイルを検索しないでください。`.flowgrid/config.json` から `evidence.base_url` を取得し、`.flowgrid/product-i18n.yaml`（または `config.productI18n`）から製品UIの対応言語（`languages`）とデフォルト言語（`defaultLocale`）を取得します。

生成対象言語 `targetLocale` ごとの画像解決ルール:
1. **ケースA — 製品UIが対応 (`targetLocale ∈ productI18n.languages`) かつ画像が存在:**
   - URL算出: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.${targetLocale}.png`
   - 埋込: `![Screen Evidence (${targetLocale.toUpperCase()})](${imageUrl})`
   - キャプション: `*(画面キャプチャ: ${targetLocale.toUpperCase()} UI)*`
2. **ケースB — 製品UIは対応しているがキャプチャ未撮影 (`targetLocale ∈ productI18n.languages`):**
   - デフォルト製品UI画像へ安全にフォールバック: `${base_url}/surfaces/${surface}/${moduleId}/${screenId}.png`
   - 埋込: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - キャプション: `*(実際のシステム画面 - デフォルト言語 ${defaultLocale.toUpperCase()}、${targetLocale.toUpperCase()}版未撮影)*`
3. **ケースC — 製品UIが非対応 (`targetLocale ∉ productI18n.languages`):**
   - 製品自体に該当言語のUIが存在しないため、デフォルトUI画像を使用します。
   - 埋込: `![Screen Evidence (${defaultLocale.toUpperCase()})](${imageUrl})`
   - キャプション: `*(実際のシステム画面 - ${defaultLocale.toUpperCase()} UI、製品は${targetLocale.toUpperCase()}非対応)*`

## 5. 出力ファイル構造
- 多言語ワークスペースでは、以下のパスに出力します:
  `surfaces/<surface>/user-manuals/<module>/<FLOW-ID>.<targetLocale>.md`
  *(例: `FLOW-ADM-TENANT-SETUP.ja.md`, `FLOW-ADM-TENANT-SETUP.en.md`)*
- 単一言語のみ設定されている場合は、後方互換性のため言語拡張子を省略できます（`<FLOW-ID>.md`）。

## 6. 行動制約（エンドユーザー視点の徹底）
- **項目羅列ではなくユーザーの目的重視:** 電話番号やメールアドレスの意味はユーザーも理解しています。「最大50文字」「必須」などの細かなバリデーションは記載せずUIに任せます。
- **タスク指向の指示:** 実際のアクション手順として記述します（「ステップ1: 管理画面でテナント追加をクリック」「ステップ2: 基本情報を入力」）。
- **条件分岐の案内:** 条件によって画面が変わる場合（例:「法人を選択すると法人番号入力欄が表示されます」）、ユーザーが迷わないよう明記します。
- **専門用語の完全排除:** 「API」「DTO」「Regex」「Schema」「Validation」などの技術用語は一切使用しません。
- **言語ごとのトーン統一:**
  - 日本語 (`ja`): 丁寧語（です・ます調）で親切かつ分かりやすく案内します。
  - 英語 (`en`): 簡潔で能動的なアクション動詞を用います。
  - ベトナム語 (`vi`): 親しみやすく自然なステップ案内とします。

