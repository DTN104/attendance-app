export type ProfileMenuId = 'info' | 'notifications' | 'security' | 'help' | 'logout';

/** `ready`: đã có màn hình. `pending`: chưa triển khai, hiển thị nhãn và không bấm được. */
export type ProfileMenuStatus = 'ready' | 'pending';

export type ProfileMenuItem = {
  id: ProfileMenuId;
  label: string;
  description?: string;
  status: ProfileMenuStatus;
  route?: '/profile-detail';
};

export const profileDetails = [
  { label: 'Phòng ban', value: 'Khối Công nghệ' },
  { label: 'Quản lý trực tiếp', value: 'Nguyễn Minh Anh' },
] as const;

export const profileMenu: ProfileMenuItem[] = [
  { id: 'info', label: 'Thông tin cá nhân', description: 'Hồ sơ nhân viên và thông tin liên hệ', status: 'ready', route: '/profile-detail' },
  { id: 'notifications', label: 'Thông báo', description: 'Cập nhật trạng thái đơn từ', status: 'pending' },
  { id: 'security', label: 'Bảo mật & thiết bị', description: 'Phiên đăng nhập và mật khẩu', status: 'pending' },
  { id: 'help', label: 'Trợ giúp', description: 'Hướng dẫn sử dụng và liên hệ hỗ trợ', status: 'pending' },
  { id: 'logout', label: 'Đăng xuất', status: 'ready' },
];
