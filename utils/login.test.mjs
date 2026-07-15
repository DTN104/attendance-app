import assert from 'node:assert/strict';

import { validateLogin } from './login.ts';

assert.deepEqual(validateLogin('', ''), {
  email: 'Vui lòng nhập email.',
  password: 'Vui lòng nhập mật khẩu.',
});
assert.deepEqual(validateLogin('nhan-vien', '123'), {
  email: 'Email chưa đúng định dạng.',
  password: 'Mật khẩu cần ít nhất 6 ký tự.',
});
assert.deepEqual(validateLogin(' nhanvien@company.vn ', '123456'), {});
