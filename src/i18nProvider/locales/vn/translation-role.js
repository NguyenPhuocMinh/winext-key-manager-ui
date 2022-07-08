const translationRole = {
  name: 'Vai Trò',
  title: {
    create: 'Tạo vài trò',
    edit: 'Cập nhật vai trò'
  },
  fields: {
    name: 'Tên Vai Trò',
    description: 'Nội Dung',
    activated: 'Kích Hoạt',
    realmName: 'Lĩnh Vực',
    users: {
      userName: 'Tên đăng nhập',
      firstName: 'Họ',
      lastName: 'Tên',
      email: 'Email'
    }
  },
  tabs: {
    details: 'Chi tiết',
    usersInRole: 'Người Dùng Trong Vai Trò',
    permissionsInRole: 'Quyền Trong Vai trò'
  },
  popup: {
    title: 'Xoá Vai Trò',
    content: 'Bạn có chắc chắn muốn xóa vĩnh viễn vai trò {{roleName}} không?'
  },
  search: 'Tìm theo tên vai trò',
  notifications: {
    errors: {
      duplicateName: 'Tên vai trò trùng lặp',
      notfound: {
        id: 'Không tìm thấy RoleID',
        name: 'Không tìm thấy Vai trò'
      }
    },
    success: {
      create: 'Tạo vai trò thành công',
      update: 'Cập nhật vai trò thành công'
    }
  }
};

export default translationRole;
