# FIGMA_HANDOFF.md

## File

- Figma: https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH
- Frame chuẩn: `390 × 844`
- Font: `Inter`
- Icon: `Lucide`
- Nền app: `#F6F8FC`

## Danh sách frame

| Mã | Màn hình | Node ID | Link | Screenshot local |
|---|---|---:|---|---|
| 01 | Tổng quan | `1:2` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=1-2) | `screenshots/01-overview.png` |
| 02 | Chấm công | `1:63` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=1-63) | `screenshots/02-attendance.png` |
| 03 | Lịch sử chấm công | `1:108` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=1-108) | `screenshots/03-history.png` |
| 04 | Đơn từ | `1:188` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=1-188) | `screenshots/04-requests.png` |
| 05 | Cá nhân | `1:246` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=1-246) | `screenshots/05-profile.png` |
| 04A | Chọn loại đơn | `8:2` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=8-2) | `screenshots/06-request-picker.png` |
| 04B | Tạo đơn nghỉ phép | `8:143` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=8-143) | `screenshots/07-leave-form.png` |
| 04C | Đăng ký tăng ca | `14:2` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=14-2) | `screenshots/08-overtime-form.png` |
| 04D | Đi công tác | `14:77` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=14-77) | `screenshots/09-business-trip-form.png` |
| 04E | Yêu cầu chỉnh công | `14:151` | [Mở frame](https://www.figma.com/design/o3nKT4NToURkFjH1kCD0WH?node-id=14-151) | `screenshots/10-adjustment-form.png` |

## Flow prototype

```text
04 - Đơn từ
  └─ TẠO ĐƠN MỚI
      └─ 04A - Chọn loại đơn
          ├─ Xin nghỉ phép       → 04B
          ├─ Đăng ký tăng ca     → 04C
          ├─ Đi công tác         → 04D
          └─ Yêu cầu chỉnh công  → 04E
```

## Đặc tả chung

- Screen width: `390`
- Screen height: `844`
- Horizontal page padding: `24`
- Header bắt đầu quanh `y = 50`
- Bottom navigation: cao `74`
- Main card radius: `16–17`
- Input radius: `16`
- Button height: `52–56`
- Primary button radius: `16`
- Border: `1px #E0E5F0`
- Background: `#F6F8FC`
- Card/input background: `#FFFFFF`

## 01 — Tổng quan

- Header chào người dùng và avatar.
- Hero trạng thái hôm nay: status chip, giờ check-in, thời gian đã làm, progress ring.
- Ba stat card: ngày công, đi muộn, OT.
- Quick actions: xin nghỉ, tăng ca, công tác, chỉnh công.
- Bottom tab active: Tổng quan.

## 02 — Chấm công

- Header.
- Map/location card.
- Trạng thái trong phạm vi văn phòng.
- Shift card.
- Camera/face verification area.
- Primary CTA `CHECK-IN NGAY`.
- Bottom tab active: Chấm công.

## 03 — Lịch sử

- Month selector.
- Calendar grid.
- Status dots.
- Recent history list.
- Status badge: đang làm, đi muộn, đủ công.
- Bottom tab active: Lịch sử.

## 04 — Đơn từ

- CTA `TẠO ĐƠN MỚI`.
- Bốn loại đơn.
- Danh sách đơn gần đây.
- Badge chờ duyệt/đã duyệt.
- Bottom tab active: Đơn từ.

## 04A — Chọn loại đơn

Thiết kế dạng bottom sheet:

- Close button.
- Tiêu đề chọn loại đơn.
- 4 option card.
- Mỗi option có Lucide icon, tên và mô tả ngắn.

## 04B — Tạo đơn nghỉ phép

Fields:

- Loại nghỉ.
- Từ ngày.
- Đến ngày.
- Duration chip.
- Lý do.
- Đính kèm.
- Leave balance summary.
- `LƯU NHÁP`.
- `GỬI ĐƠN`.

## 04C — Đăng ký tăng ca

Fields:

- Loại tăng ca.
- Ngày tăng ca.
- Từ giờ.
- Đến giờ.
- Tổng số giờ.
- Nội dung công việc.
- Đính kèm.
- Tổng OT trong tháng.
- `LƯU NHÁP`.
- `GỬI ĐƠN`.

## 04D — Đi công tác

Fields:

- Địa điểm công tác.
- Từ ngày.
- Đến ngày.
- Duration chip.
- Mục đích công tác.
- Lịch trình/tài liệu đính kèm.
- Tóm tắt chuyến đi.
- `LƯU NHÁP`.
- `GỬI ĐƠN`.

## 04E — Yêu cầu chỉnh công

Fields:

- Loại điều chỉnh.
- Ngày cần chỉnh.
- Giờ đề nghị.
- Lý do điều chỉnh.
- Minh chứng.
- Card dữ liệu chấm công hiện tại.
- `LƯU NHÁP`.
- `GỬI ĐƠN`.

## 05 — Cá nhân

- Avatar, họ tên, chức danh, công ty.
- Mã nhân viên.
- Phòng ban.
- Quản lý trực tiếp.
- Settings: thông tin cá nhân, thông báo, bảo mật & thiết bị, trợ giúp.
- Bottom tab active: Cá nhân.
