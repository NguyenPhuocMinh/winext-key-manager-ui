const configureRoutes = [
  {
    parent: null,
    pathName: '/configures',
    routerName: 'routes.configure.label',
    leftIcon: 'Build'
  },
  {
    parent: {
      pathName: '/configures',
      routerName: 'routes.configure.label'
    },
    pathName: '/realm-list',
    routerName: 'routes.configure.child.realm.label',
    leftIcon: 'Waves'
  }
];

const manageRoutes = [
  {
    parent: null,
    pathName: '/manages',
    routerName: 'routes.manage.label',
    leftIcon: 'ManageAccounts'
  },
  {
    parent: {
      pathName: '/manages',
      routerName: 'routes.manage.label'
    },
    pathName: '/group-list',
    routerName: 'routes.manage.child.group.label',
    leftIcon: 'Groups'
  },
  {
    parent: {
      pathName: '/manages',
      routerName: 'routes.manage.label'
    },
    pathName: '/user-list',
    routerName: 'routes.manage.child.user.label',
    leftIcon: 'Person'
  },
  {
    parent: {
      pathName: '/manages',
      routerName: 'routes.manage.label'
    },
    pathName: '/role-list',
    routerName: 'routes.manage.child.role.label',
    leftIcon: 'PlaylistRemove'
  },
  {
    parent: {
      pathName: '/manages',
      routerName: 'routes.manage.label'
    },
    pathName: '/permission-list',
    routerName: 'routes.manage.child.permission.label',
    leftIcon: 'SyncLock'
  },
  {
    parent: {
      pathName: '/manages',
      routerName: 'routes.manage.label'
    },
    pathName: '/sessions',
    routerName: 'routes.manage.child.session.label',
    leftIcon: 'ManageHistory'
  }
];

const routes = [
  {
    parent: null,
    pathName: '/',
    routerName: 'routes.dashBoard.label',
    leftIcon: 'Dashboard'
  },
  ...configureRoutes,
  ...manageRoutes
];

export default routes;
