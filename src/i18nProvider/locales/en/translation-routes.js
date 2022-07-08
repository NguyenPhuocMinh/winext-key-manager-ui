const translationRoutes = {
  dashBoard: {
    label: 'DashBoard'
  },
  configure: {
    label: 'Configure',
    child: {
      realm: {
        label: 'Realm'
      }
    }
  },
  manage: {
    label: 'Manage',
    child: {
      group: {
        label: 'Group'
      },
      user: {
        label: 'User'
      },
      role: {
        label: 'Role'
      },
      permission: {
        label: 'Permission'
      },
      session: {
        label: 'Session'
      }
    }
  }
};

export default translationRoutes;
