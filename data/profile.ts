export type ProfileMenuId = 'info' | 'notifications' | 'security' | 'help' | 'logout';

export type ProfileMenuItem = {
  id: ProfileMenuId;
  label: string;
  description?: string;
};

export const profileStats = [
  { label: 'Ngày phép còn lại', value: '10' },
  { label: 'Ngày công tháng', value: '12' },
] as const;

export const profileDetails = [
  { label: 'Mã nhân viên', value: 'NV-0248' },
  { label: 'Phòng ban', value: 'Kinh doanh' },
  { label: 'Email', value: 'minhanh@company.vn' },
] as const;

export const profileMenu: ProfileMenuItem[] = [
  { id: 'info', label: 'Thông tin cá nhân', description: 'Cập nhật hồ sơ của bạn' },
  { id: 'notifications', label: 'Thông báo', description: 'Cài đặt thông báo ứng dụng' },
  { id: 'security', label: 'Bảo mật', description: 'Mật khẩu và thiết bị' },
  { id: 'help', label: 'Trợ giúp & hỗ trợ' },
  { id: 'logout', label: 'Đăng xuất' },
];
