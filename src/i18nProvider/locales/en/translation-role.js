const translationRole = {
  name: 'Roles',
  title: {
    create: 'Create Role',
    edit: 'Edit Role'
  },
  fields: {
    id: 'ID',
    createdAt: 'createdAt',
    name: 'Role Name',
    description: 'Description',
    activated: 'Enable',
    users: {
      userName: 'Username',
      firstName: 'First Name',
      email: 'Email',
      lastName: 'Last Name'
    },
    permissions: {
      name: 'Permission Name',
      description: 'Permission Description'
    }
  },
  tabs: {
    details: 'Details',
    usersInRole: 'Users In Role',
    permissionsInRole: 'Permissions In Role'
  },
  popup: {
    title: 'Delete Role',
    content:
      'Are you sure you want to permanently delete the role {{roleName}}?'
  },
  search: 'Search by role name',
  notifications: {
    errors: {
      duplicateName: 'Duplicate role name',
      notfound: {
        id: 'RoleID Not Found',
        name: 'Role Not Found'
      }
    },
    success: {
      create: 'Create Role Success',
      update: 'Update Role Success',
      getUsers: 'Get Users In Role Success',
      getPermissions: 'Get Permissions In Role Success'
    }
  }
};

export default translationRole;
