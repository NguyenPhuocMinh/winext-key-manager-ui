const translationRealm = {
  name: 'Realm',
  title: {
    create: 'Tạo Lĩnh Vực',
    edit: 'Cập Nhật Lĩnh Vực'
  },
  fields: {
    name: 'Tên lĩnh vực',
    titleName: 'Tiêu đề hiển thị',
    activated: 'Kích hoạt',
    createdAt: 'Ngày tạo',
    users: {
      userName: 'Tên đăng nhập',
      firstName: 'Họ',
      lastName: 'Tên',
      email: 'Email'
    }
  },
  tabs: {
    general: 'Chung',
    keys: 'Khoá',
    email: 'Email',
    token: 'Token',
    keyTabs: {
      active: 'Hoạt động',
      disabled: 'Không hoạt động',
      provider: 'Nhà cung cấp'
    }
  },
  popup: {
    title: 'Xoá lĩnh vực',
    content: 'Bạn có chắc chắn muốn xóa vĩnh viễn lĩnh vực {{realmName}} không?'
  },
  search: 'Tìm theo tên lĩnh vực',
  notifications: {
    errors: {
      duplicateName: 'Tên lĩnh vực trùng lặp'
    },
    success: {
      create: 'Tạo lĩnh vực thành công success',
      update: 'Cập nhật vực thành công success'
    },
    notfound: {
      id: 'Không tìm thấy RealmID'
    }
  }
};

export default translationRealm;
