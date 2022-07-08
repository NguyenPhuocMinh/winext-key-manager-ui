const translationValidation = {
  required: 'Bắt buộc',
  minLength: 'Ít nhất phải có {{min}} ký tự',
  maxLength: 'Phải có {{max}} ký tự trở xuống',
  minValue: 'Ít nhất phải là {{min}}',
  maxValue: 'Phải từ {{max}} trở xuống',
  users: {
    email: 'Email không khớp với định dạng',
    password:
      'Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự chữ hoa đặc biệt',
    password_confirm: 'Mật khẩu xác nhận không khớp với mật khẩu'
  },
  email: 'Email không khớp với định dạng',
  uppercase: 'Phải là các ký tự viết hoa',
  trim: 'Vui lòng xóa khoảng trắng'
};

export default translationValidation;
