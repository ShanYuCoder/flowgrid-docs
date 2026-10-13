# Skill: `/architecture-grill`

## Tên
`architecture-grill`

## Cách dùng (Command/Trigger)
- Gọi qua slash command: `/architecture-grill`
- Chỉ dùng khi cần đào sâu (Grill/Interview) thiết kế kiến trúc mức cao (High-level Design), sau khi đã có ý tưởng sơ bộ. 

## Input (Dữ liệu đầu vào)
- Tài liệu kiến trúc hiện tại, các định nghĩa ranh giới hệ thống (Context boundaries) hoặc mô hình dữ liệu (Data model) sơ bộ.
- Áp dụng chung cho các mức kiến trúc phía trên cấp độ chức năng (Functions).

## Output (Kết quả mong đợi)
- Chuỗi các câu hỏi sắc bén (Interview/Grill) để vạch trần các lỗ hổng trong luồng nghiệp vụ.
- Sau khi chốt hạ được quyết định kiến trúc, Agent sẽ cập nhật lại các file tài liệu kiến trúc tương ứng (Overview, Module, Surfaces).

## Description / Ý nghĩa
- Giống như `/grill` hay `/grill-bqa` dành cho Spec (Đặc tả màn hình), nhưng `/architecture-grill` ở một tầng (Layer) cao hơn rất nhiều.
- Nó chỉ tập trung vào việc chất vấn (Grill):
  - Luồng nghiệp vụ chéo (Cross-cutting business flows).
  - Ranh giới giữa các dịch vụ (Service Context Boundaries).
  - Thiết kế Data Model tổng thể.
- **Lưu ý:** Nếu chỉ đơn thuần muốn khám phá (Discovery) một Layer chung chung thì nên xài `/grill` gốc, `/architecture-grill` mang tính chất "soi mói" chuyên sâu hơn.

## Các Skill liên quan
- **Trước đó:** `/architecture` (để định vị vị trí cần thiết kế).
- **Lựa chọn thay thế:** Có thể dùng `/grill` nếu chỉ cần discovery mức chung.

## Chú ý quan trọng
- Luôn phải tuân thủ việc mô hình hoá lỗi trong Mermaid (nếu có vẽ vời Flowchart).
- Tuân thủ nghiêm luật Tech Debt: Bất cứ câu hỏi nào mà Member không thể quyết định ngay, bắt buộc cung cấp tuỳ chọn "Log as Tech Debt" qua Form AskQuestion và ghi vào `qa-inbox`.

---

## Example prompt (mẫu gọi)

**Quy tắc:** một session = một command · chat mới khi đổi phase · cập nhật `.harness/progress.md` nếu có.

**Khi nào:** Gọi khi scope khớp mô tả skill ở trên.

```text
/architecture-grill

Surface: {admin-web} · Module: {CMP-…} · Scope: {mô tả ngắn}
```

