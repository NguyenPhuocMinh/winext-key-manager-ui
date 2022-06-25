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
  },
  {
    parent: {
      pathName: '/configures',
      routerName: 'routes.configure.label'
    },
    pathName: '/realm-create',
    routerName: 'routes.configure.child.realm.label',
    leftIcon: 'Waves'
  },
  {
    parent: {
      pathName: '/configures',
      routerName: 'routes.configure.label'
    },
    pathName: '/realm-edit/:id',
    routerName: 'routes.configure.child.realm.label',
    leftIcon: 'Waves'
  },
  {
    parent: {
      pathName: '/configures',
      routerName: 'routes.configure.label'
    },
    pathName: '/role-list',
    routerName: 'routes.configure.child.role.label',
    leftIcon: 'PlaylistRemove'
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
    pathName: '/sessions',
    routerName: 'routes.manage.child.session.label',
    leftIcon: 'ManageHistory'
  }
];

export default routes;
