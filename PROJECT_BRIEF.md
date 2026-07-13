# Attendance App

## Figma

https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH

## Mục tiêu

Xây dựng ứng dụng quản lý chấm công dành cho nhân viên.

## Công nghệ

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet
- Lucide React Native

## Các màn hình

1. Tổng quan
2. Chấm công
3. Lịch sử
4. Đơn từ
5. Cá nhân

## Backend dự kiến

- Next.js API
- PostgreSQL
- Drizzle ORM
- MinIO để lưu ảnh check-in/check-out

## Luồng chính

Đăng nhập
→ Xem dashboard
→ Xác nhận GPS
→ Chụp ảnh
→ Check-in
→ Check-out
→ Xem lịch sử

## Quy tắc code

- Tách component dùng chung
- Không để API call trực tiếp trong UI component
- Dùng TypeScript strict
- Dùng design tokens cho màu, spacing và typography
- Không hard-code mock data trong screen