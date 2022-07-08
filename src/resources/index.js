import {
  RealmList,
  RealmCreate,
  RealmEdit,
  RoleList,
  RoleCreate,
  RoleEdit,
  GroupList,
  GroupCreate,
  GroupEdit,
  UserList,
  UserCreate,
  UserEdit,
  PermissionList,
  PermissionCreate,
  PermissionEdit
} from '@components/index';

const resources = [
  {
    name: 'realm-list',
    component: RealmList
  },
  {
    name: 'realm-create',
    component: RealmCreate
  },
  {
    name: 'realm-edit/:realmID',
    component: RealmEdit
  },
  {
    name: 'role-list',
    component: RoleList
  },
  {
    name: 'role-create',
    component: RoleCreate
  },
  {
    name: 'role-edit/:roleID',
    component: RoleEdit
  },
  {
    name: 'group-list',
    component: GroupList
  },
  {
    name: 'group-create',
    component: GroupCreate
  },
  {
    name: 'group-edit/:groupID',
    component: GroupEdit
  },
  {
    name: 'user-list',
    component: UserList
  },
  {
    name: 'user-create',
    component: UserCreate
  },
  {
    name: 'user-edit/:userID',
    component: UserEdit
  },
  {
    name: 'permission-list',
    component: PermissionList
  },
  {
    name: 'permission-create',
    component: PermissionCreate
  },
  {
    name: 'permission-edit/:perID',
    component: PermissionEdit
  }
];

export default resources;
