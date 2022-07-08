const translationGroup = {
  name: 'Groups',
  title: {
    create: 'Tạo Nhóm',
    edit: 'Cập Nhật Nhóm'
  },
  fields: {
    id: 'ID',
    createdAt: 'Ngày tạo',
    name: 'Tên Nhóm',
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
    usersInGroup: 'Thành Viên Trong Nhóm'
  },
  popup: {
    title: 'Xoá Nhóm',
    content: 'Bạn có chắc chắn muốn xóa vĩnh viễn quyền {{groupName}} không?'
  },
  search: 'Search by permission name',
  notifications: {
    errors: {
      duplicateName: 'Tên Nhóm Bị Trùng Lặp',
      duplicateGroupOrRealmName: 'Tên Nhóm Hoặc Linh Vực Bị Trùng Lặp',
      notfound: {
        id: 'PermissionID not found'
      }
    },
    success: {
      get: 'Lấy Tất Cả Các Nhóm Thành Công',
      create: 'Tạo Nhóm Thành Công',
      update: 'Cập Nhật Nhóm Thành Công'
    }
  }
};

export default translationGroup;
