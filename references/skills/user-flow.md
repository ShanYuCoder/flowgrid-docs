# Skill: `/user-flow`

**SSOT:** `harness/docs/skills/user-flow/SKILL.md`

Kỹ năng dùng để thiết kế luồng người dùng chi tiết, đóng vai trò bản đồ chỉ đường xuyên suốt cho các màn hình (W-*) và API (API-*).

- Author `FLOW-*.md` under `architecture/03-user-flows/` or `**/common/user-flows/`.
- Convention ID: `FLOW-{SURF}-{DOMAIN}-{NN}` (Ví dụ: `FLOW-ADM-AUTH-01`). Tuyệt đối không dùng `FLOW-{slug}` hay các định dạng khác.
- Audit: `flowgrid audit flow <path>`.

## Các nhóm User Flow cốt lõi
1. **Hành trình đa bước (Multi-step Journey)**: Checkout, wizard đăng ký.
2. **State machine (Chuyển trạng thái)**: Trạng thái đơn hàng, luồng duyệt văn bản.
3. **Phân nhánh Role (Role branching)**: Luồng cho Admin vs Customer.
4. **Async/Webhooks**: Payment callbacks, xử lý nền.
5. **Dialog Sub-flows**: Các luồng con trong modal/drawer liên quan nhiều màn hình.
