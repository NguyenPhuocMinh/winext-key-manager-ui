import {
  RealmList,
  RealmCreate,
  RealmEdit,
  RoleList,
  RoleCreate,
  GroupList,
  GroupCreate,
  UserList,
  UserCreate
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
    name: 'group-list',
    component: GroupList
  },
  {
    name: 'group-create',
    component: GroupCreate
  },
  {
    name: 'user-list',
    component: UserList
  },
  {
    name: 'user-create',
    component: UserCreate
  }
];

export default resources;
