# CLI_PROMPT.md

Copy toàn bộ phần bên dưới vào Codex CLI:

---

Hãy đọc các file sau trước khi làm bất kỳ thay đổi nào:

- `AGENTS.md`
- `PROJECT_BRIEF.md`
- `FIGMA_HANDOFF.md`
- `DESIGN_TOKENS.json`
- toàn bộ file trong `screenshots/`

Không phụ thuộc vào Figma MCP. Nếu MCP bị giới hạn hoặc không truy cập được, dùng screenshot, node link và đặc tả local làm nguồn sự thật.

## Task hiện tại

1. Kiểm tra cấu trúc project Expo hiện tại.
2. Báo cáo các dependency và file dự kiến tạo/sửa.
3. Cấu hình Expo Router cho 5 tab:
   - Tổng quan
   - Chấm công
   - Lịch sử
   - Đơn từ
   - Cá nhân
4. Tạo design token dùng chung dựa trên `DESIGN_TOKENS.json`.
5. Tạo component dùng chung:
   - ScreenHeader
   - AppCard
   - FormField
   - DateField
   - TimeField
   - StatusBadge
   - PrimaryButton
   - SecondaryButton
   - AttachmentField
   - SummaryCard
6. Triển khai các screen theo `FIGMA_HANDOFF.md`.
7. Triển khai flow đơn từ:
   - chọn loại đơn
   - nghỉ phép
   - tăng ca
   - công tác
   - chỉnh công
8. Dùng `lucide-react-native`, không dùng ký hiệu text thay icon.
9. Dùng mock data tách khỏi screen.
10. Tạo TypeScript types cho attendance và requests.
11. Chưa kết nối API, GPS, camera hoặc upload thật.
12. Chạy type-check và lint khi hoàn thành.

## Tiêu chí

- Khớp screenshot và đặc tả.
- Không hard-code token trong screen.
- Android/iOS đều hoạt động.
- Keyboard không che input trong form.
- Form có scroll.
- Footer action ở form phải dễ thao tác.
- Không tạo component quá lớn.
- Không cài UI framework khác.

Sau khi hoàn thành, báo cáo:
- file đã tạo/sửa
- dependency đã cài
- phần đã khớp UI
- phần còn thiếu
- kết quả type-check/lint

---
