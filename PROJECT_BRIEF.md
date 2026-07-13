# Attendance App

## 1. Tổng quan

Attendance App là ứng dụng quản lý chấm công dành cho nhân viên.

Ứng dụng hỗ trợ:

- Theo dõi trạng thái làm việc trong ngày.
- Check-in và check-out.
- Xem lịch sử chấm công.
- Tạo và theo dõi các loại đơn.
- Xem thông tin cá nhân và thiết lập tài khoản.

## 2. Figma

File thiết kế chính:

https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH

Thông tin chi tiết từng frame, node ID và flow giao diện được ghi trong:

- `FIGMA_HANDOFF.md`
- `DESIGN_TOKENS.json`
- thư mục `screenshots/`

Nếu Figma MCP không truy cập được, sử dụng các tài liệu local trên làm nguồn tham chiếu.

## 3. Công nghệ

### Mobile app

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet
- lucide-react-native
- react-native-svg

### Backend dự kiến

- Next.js API hoặc Node.js
- PostgreSQL
- Drizzle ORM
- MinIO hoặc S3-compatible storage

Backend chưa nằm trong phạm vi triển khai UI hiện tại.

## 4. Các màn hình chính

Ứng dụng có 5 tab:

1. Tổng quan
2. Chấm công
3. Lịch sử
4. Đơn từ
5. Cá nhân

## 5. Flow chấm công

```text
Đăng nhập
→ Xem Tổng quan
→ Mở màn hình Chấm công
→ Kiểm tra vị trí
→ Xác nhận ca làm việc
→ Chụp ảnh xác thực
→ Check-in
→ Check-out
→ Xem lịch sử chấm công