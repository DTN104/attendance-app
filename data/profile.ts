export type ProfileMenuId = 'info' | 'notifications' | 'security' | 'help' | 'logout';

export type ProfileMenuItem = {
  id: ProfileMenuId;
  label: string;
  description?: string;
};

export const profileDetails = [
  { label: 'Phòng ban', value: 'Khối Công nghệ' },
  { label: 'Quản lý trực tiếp', value: 'Nguyễn Minh Anh' },
] as const;

export const profileMenu: ProfileMenuItem[] = [
  { id: 'info', label: 'Thông tin cá nhân' },
  { id: 'notifications', label: 'Thông báo' },
  { id: 'security', label: 'Bảo mật & thiết bị' },
  { id: 'help', label: 'Trợ giúp' },
  { id: 'logout', label: 'Đăng xuất' },
];
