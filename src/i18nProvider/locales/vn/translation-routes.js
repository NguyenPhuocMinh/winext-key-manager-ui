const translationRoutes = {
  dashBoard: {
    label: 'Bảng điều khiển'
  },
  configure: {
    label: 'Cấu hình',
    child: {
      realm: {
        label: 'Lĩnh vực'
      },
      provider: {
        label: 'Nhà cung cấp'
      }
    }
  },
  manage: {
    label: 'Quản lí',
    child: {
      group: {
        label: 'Nhóm'
      },
      user: {
        label: 'Người dùng'
      },
      role: {
        label: 'Vai trò'
      },
      permission: {
        label: 'Phân quyền'
      },
      session: {
        label: 'Phiên hoạt động'
      }
    }
  }
};

export default translationRoutes;
