const translationPermission = {
  name: 'Phân Quyền',
  title: {
    create: 'Tạo Quyền',
    edit: 'Cập Nhật Quyền'
  },
  fields: {
    name: 'Tên Quyền',
    description: 'Nội Dung',
    activated: 'Kích Hoạt',
    realmName: 'Lĩnh Vực'
  },
  tabs: {
    details: 'Chi tiết',
    rolesInPermission: 'Các vai trò trong quyền'
  },
  popup: {
    title: 'Xoá quyền',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn quyền {{permissionName}} không?'
  },
  search: 'Tìm theo tên quyền',
  notifications: {
    errors: {},
    success: {
      create: 'Tạo quyền thành công',
      update: 'Cập nhật quyền thành công',
      delete: 'Xoá quyền thành công'
    }
  },
  transferList: {
    roles: {
      titleLeft: 'Các vai trò khả dụng',
      titleRight: 'Các vai trò được chỉ định'
    }
  }
};

export default translationPermission;
