export type LoginErrors = { email?: string; password?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(email: string, password: string) {
  const errors: LoginErrors = {};
  const normalizedEmail = email.trim();

  if (!normalizedEmail) errors.email = 'Vui lòng nhập email.';
  else if (!EMAIL_PATTERN.test(normalizedEmail)) errors.email = 'Email chưa đúng định dạng.';

  if (!password) errors.password = 'Vui lòng nhập mật khẩu.';
  else if (password.length < 6) errors.password = 'Mật khẩu cần ít nhất 6 ký tự.';

  return errors;
}
