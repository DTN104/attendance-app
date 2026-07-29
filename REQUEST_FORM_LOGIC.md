# Logic kiểm tra form tạo request

## Mục tiêu

Áp dụng chung cho bốn form:

- Nghỉ phép (`leave`).
- Tăng ca (`overtime`).
- Công tác (`business`).
- Chỉnh công (`adjustment`).

Form có hai hành động độc lập: **Lưu nháp** và **Gửi đơn**.

## Kiểm tra dữ liệu

### Khi lưu nháp

- Cho phép các trường nội dung bắt buộc còn trống.
- Ngày và giờ vẫn phải là giá trị hợp lệ để draft có thể mở lại.
- Nếu có file, chỉ nhận PNG, JPG hoặc PDF và dung lượng tối đa 10 MB.
- Dữ liệu text được `trim()` trước khi gửi API.

### Khi gửi đơn

| Loại request | Điều kiện bắt buộc |
| --- | --- |
| Nghỉ phép | Có lý do; ngày kết thúc không trước ngày bắt đầu |
| Tăng ca | Có nội dung công việc; giờ kết thúc sau giờ bắt đầu |
| Công tác | Có mục đích; ngày kết thúc không trước ngày bắt đầu |
| Chỉnh công | Có lý do; ngày và giờ đề nghị hợp lệ |

Nếu không đạt điều kiện, nút **Gửi đơn** bị vô hiệu hóa. **Lưu nháp** vẫn hoạt động.

## Luồng tạo request mới

```text
Người dùng nhập form
→ kiểm tra file ngay khi chọn
→ bấm LƯU NHÁP hoặc GỬI ĐƠN
→ chuẩn hóa payload
→ tạo request ở trạng thái draft
```

Nếu bấm **Gửi đơn**, tiếp tục luồng gửi sau khi draft được tạo thành công.

## Luồng file đính kèm của draft

Không lưu URI cache của `DocumentPicker` làm dữ liệu lâu dài vì URI có thể mất sau khi app khởi động lại.

```text
Tạo/cập nhật draft để có requestId
→ xin presigned URL với ownerId = requestId
→ upload file lên MinIO
→ complete upload
→ cập nhật attachmentId vào draft
```

Khi mở lại draft, form lấy `attachmentId` và metadata từ API. Khi gửi đơn, dùng lại `attachmentId`; không upload lại file.

Nếu upload thất bại khi tạo draft mới:

- Phần dữ liệu form đã tạo trên server vẫn được giữ.
- Form không tự điều hướng khỏi màn hình.
- Hiển thị lỗi để người dùng thử lưu lại.
- Lần thử lại phải cập nhật draft vừa tạo, không tạo thêm draft trùng.

## Luồng cập nhật draft

```text
Mở draft theo id
→ nạp payload và attachment hiện tại
→ người dùng chỉnh sửa
→ nếu chọn file mới: upload file mới
→ PATCH draft với payload và attachmentId mới
```

Nếu không đổi file, giữ nguyên `attachmentId`. Nếu bỏ file, gửi `attachmentId: null`.

## Luồng submit

```text
Đảm bảo draft đã có attachmentId hợp lệ
→ POST /requests/:id/submit với attachmentIds
→ chuyển trạng thái draft thành pending
→ điều hướng đến chi tiết request
```

Request submit phải dùng idempotency key để tránh gửi trùng khi người dùng bấm lại hoặc mạng chập chờn.
