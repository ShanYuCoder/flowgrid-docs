# ワークフロー：エンドユーザー向けマニュアルの自動構築 (User Manuals)

**FlowGrid** エコシステムにおいて、エンドユーザー向け操作マニュアルは決してゼロから手動で書かれることはありません。それは**技術仕様書 (Spec)** と**自動テスト証跡 (E2E スクリーンショット)** の自動合成によって生成され、実稼働システムとの 100% の整合性を保証します。

本ガイドでは、AI 支援によるローカル下書き生成から、ステークホルダーや顧客向けの **Google Docs** への同期公開までの完全なワークフローを解説します。

---

## 1. 前提条件

マニュアル構築に着手する前に以下を確認してください：
1. **仕様とフローの確定：** 業務フロー文書（例：`surfaces/admin/tenant/user-flows/FLOW-ADM-TENANT-SETUP.md`）が存在すること。
2. **自動テストの実行 (Phase 4)：** Playwright/Cypress による自動テストが成功し、実際の画面キャプチャが `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png` に保存されていること。
3. **Google Docs API の認証設定：** サービスアカウント経由で Google Workspace へのアクセス権が付与されていること。
   - Google Cloud Console からサービスアカウントの JSON 秘密鍵をダウンロード。
   - `google-credentials.json` にリネームし、ルートディレクトリ（または `.secrets/`）に配置。
   - **重大なセキュリティ上の注意：** 秘密鍵の漏洩を防ぐため、`google-credentials.json` と `.secrets/` を必ず `.gitignore` に追加してください。
   - FlowGrid アダプタはこの認証情報を自動検出します。

---

## 2. ステップ 1：ローカルでのマニュアル生成

すべてのマニュアルは、**単一情報源 (SSOT)** としてまずローカルの Markdown 形式で生成されます。画面項目の機械的な羅列ではなく、**ユーザーフロー（業務ジャーニー）** を中心に構成されます。

**実行コマンド：**
```bash
flowgrid docs /manual FLOW-ADM-TENANT-SETUP
```

**AI Agent が実行する内容：**
1. **ユーザーフローの解析：** `FLOW-*.md` から操作ステップと分岐条件（例：「エンタープライズ選択時はステップ X へ進む」）を抽出。
2. **技術仕様の参照：** 画面仕様 (`W-*`) を参照し、高水準の目的を把握。必須や桁数などの自明なバリデーション規則はマニュアルの可読性を損なうため自動的に除外。
3. **人間向けの平易な言葉へ翻訳：** 「ステップ 1：X 画面へ移動する… ステップ 2：Y を入力する」といったユーザー視点の操作ガイドを記述。
4. **E2E スクリーンショットの自動埋め込み：** `qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png` を参照する画像リンクを自動挿入。
5. **メタデータの初期化：** ファイル先頭に YAML Frontmatter を付与。

**出力成果物：**
`surfaces/admin/user-manuals/tenant/FLOW-ADM-TENANT-SETUP.md` に生成されます。

```markdown
---
gdoc_id: "" 
gdrive_image_id: "" 
content_hash: ""
---
# テナント初期セットアップ手順書
以下は実際のアプリケーション画面です：
![画面証跡](../../../qa/e2e/evidence/FLOW-ADM-TENANT-SETUP-main.png)
...
```

---

## 3. ステップ 2：Google Docs への自動公開

エンドユーザーは生 Markdown を直接閲覧せず、読みやすく共有しやすい Google Docs リンクを求めます。

**実行コマンド：**
```bash
flowgrid publish manual FLOW-ADM-TENANT-SETUP --target=gdocs
```

**公開アダプタのアーキテクチャ (`gdocs-adapter.mjs`)：**

1. **差分検知 (ハッシュ照合によるスキップ)：**
   - 本文テキストと画像バイナリを組み合わせて MD5 ハッシュを算出。
   - 前回の `content_hash` と比較し、変更がなければ処理を安全にスキップ。
   - **メリット：** 画面数が数百あるプロジェクトにおいて **Google Docs API のレートリミット超過を防止** します。

2. **Google Drive への画像アップロード：**
   - Google Docs API はローカル画像を直接埋め込めないため、連携された Google Drive へアップロードし、一時アクセス URL を取得します。

3. **Google Doc の更新 (Clear & Replace 方式)：**
   - `gdoc_id` が空の場合：新規 Google Doc を作成し、ID をローカル Frontmatter に記録。
   - `gdoc_id` が存在する場合：既存本文を一括削除 (`deleteContentRange`) してから最新内容と画像を再配置。
   - **メリット：** 共有済みの Google Docs URL が変わらないため、URL リンク切れを起こしません。

---

## 4. 更新・メンテナンス方針

> **根本規約：** Google Docs に公開されたドキュメントは**厳格に読取専用 (Read-Only)** です。

内容の修正が必要な場合は、必ず上流から変更を適用します：
1. 技術仕様またはローカルの `.md` マニュアルを修正。
2. UI 変更がある場合は E2E テストを再実行してキャプチャを更新。
3. `flowgrid publish` を再実行。

**Google Docs の Web UI 上で直接テキストを編集してはなりません。** アダプタは*クリア＆置換*を行うため、Web 上での直接編集は次回のローカル公開時に完全に上書きされます。この規約により、Git リポジトリが唯一の信頼できる情報源であり続けることが保証されます。
