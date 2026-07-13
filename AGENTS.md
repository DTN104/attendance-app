# Project instructions

Trước khi thực hiện bất kỳ task nào:

1. Đọc `PROJECT_BRIEF.md`.
2. Đọc `FIGMA_HANDOFF.md`.
3. Đọc `DESIGN_TOKENS.json`.
4. Kiểm tra các ảnh tham chiếu trong thư mục `screenshots/`.
5. Kiểm tra cấu trúc project hiện tại trước khi tạo hoặc sửa file.
6. Giữ thiết kế khớp với file Figma được ghi trong project brief.
7. Không tự thay đổi stack công nghệ nếu chưa được yêu cầu.
8. Chạy type-check và lint sau khi sửa code.
9. Ưu tiên component có thể tái sử dụng.

## Nguồn tham chiếu UI

Khi triển khai giao diện, sử dụng thứ tự ưu tiên sau:

1. Screenshot trong thư mục `screenshots/`.
2. Đặc tả màn hình trong `FIGMA_HANDOFF.md`.
3. Design tokens trong `DESIGN_TOKENS.json`.
4. Link Figma và node ID ghi trong tài liệu.
5. Source code hiện tại.

Không bắt buộc gọi Figma MCP.

Nếu Figma MCP bị giới hạn, hết quota hoặc không truy cập được, không dừng task.
Tiếp tục triển khai dựa trên screenshot, tài liệu handoff và design tokens trong project.

## Stack công nghệ

Giữ nguyên stack hiện tại của project.

Đối với ứng dụng này, ưu tiên:

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet
- lucide-react-native
- react-native-svg

Không tự cài:

- Tailwind CSS
- NativeWind
- UI framework khác
- State management library mới

trừ khi task yêu cầu hoặc project đã sử dụng sẵn.

## Quy tắc kiến trúc

- Tách screen, component, hook, service, mock data và type.
- Không gọi API trực tiếp trong presentational component.
- Không đặt mock data trực tiếp trong screen lớn.
- Không hard-code màu sắc, spacing và radius trong từng component.
- Dùng design tokens từ thư mục `constants`, `theme` hoặc cấu trúc hiện có.
- Tái sử dụng component cho button, card, field, badge, header và form section.
- Không tạo một component quá lớn cho toàn bộ màn hình.
- Dùng Lucide icon thay vì ký hiệu text hoặc emoji.
- Hỗ trợ cả Android và iOS.
- Form phải hỗ trợ scroll và tránh bị bàn phím che input.
- Không thay đổi product flow nếu chưa được yêu cầu.

## Quy tắc khi sửa code

Trước khi sửa:

1. Kiểm tra các dependency hiện có.
2. Kiểm tra component tương tự đã tồn tại chưa.
3. Trình bày ngắn các file dự kiến tạo hoặc sửa.
4. Không viết lại phần đang hoạt động tốt nếu có thể tái sử dụng.

Sau khi sửa:

```bash
npx tsc --noEmit
npm run lint