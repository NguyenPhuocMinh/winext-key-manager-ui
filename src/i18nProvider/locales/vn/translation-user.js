const translationUser = {
  name: 'Users',
  title: {
    create: 'Tạo người dùng',
    edit: 'Chỉnh sửa người dùng',
    tabs: {
      credentials: 'Đặt lại mật khẩu',
      roles: 'Đặt vai trò',
      groups: 'Đặt nhóm'
    }
  },
  fields: {
    id: 'ID',
    createdAt: 'Ngày tạo',
    userName: 'Tên đăng nhập',
    email: 'Email',
    firstName: 'Họ',
    lastName: 'Tên',
    activated: 'Kích hoạt',
    realmName: 'Lĩnh vực',
    password: 'Mật khẩu',
    passwordConfirm: 'Xác nhận mật khẩu'
  },
  tabs: {
    details: 'Chi tiết',
    credentials: 'Thông tin xác thực',
    roles: 'Vai trò',
    groups: 'Các nhóm'
  },
  popup: {
    title: 'Xoá người dùng',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng {{userName}} không?'
  },
  search: 'Tìm theo tên đăng nhập, lĩnh vực',
  notifications: {
    errors: {},
    success: {
      create: 'Tạo mới người dùng thành công',
      update: 'Cập nhật người dùng thành công',
      addRoles: 'Gán vai trò cho người dùng thành công',
      addGroups: 'Gán nhóm người dùng thành công'
    },
    notfound: {
      id: 'Không tìm thấy UserID'
    }
  },
  transferList: {
    roles: {
      titleLeft: 'Các vai trò khả dụng',
      titleRight: 'Các vai trò được chỉ định'
    },
    groups: {
      titleLeft: 'Các nhóm khả dụng',
      titleRight: 'Các nhóm được chỉ định'
    }
  }
};

export default translationUser;
