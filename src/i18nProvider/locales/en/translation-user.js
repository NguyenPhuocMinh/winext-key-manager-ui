const translationUser = {
  name: 'Users',
  title: {
    create: 'Create User',
    edit: 'Edit User',
    tabs: {
      credentials: 'Reset Password',
      roles: 'Set Roles',
      groups: 'Set Groups'
    }
  },
  fields: {
    id: 'ID',
    createdAt: 'createdAt',
    userName: 'Username',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    activated: 'Enable',
    realmName: 'Realm',
    password: 'Password',
    passwordConfirm: 'Password Confirm'
  },
  tabs: {
    details: 'Details',
    credentials: 'Credentials',
    roles: 'Roles',
    groups: 'groups'
  },
  popup: {
    title: 'Delete User',
    content:
      'Are you sure you want to permanently delete the user {{userName}}?'
  },
  search: 'Search by username, realm',
  notifications: {
    errors: {},
    success: {
      create: 'Create User Success',
      update: 'Update User Success',
      addRoles: 'Set Roles To User Success',
      addGroups: 'Set Groups To User Success',
      setTemporaryPassword: 'Set Temporary Password Success'
    },
    notfound: {
      id: 'UserID not found'
    }
  },
  transferList: {
    roles: {
      titleLeft: 'Available Roles',
      titleRight: 'Assigned Roles'
    },
    groups: {
      titleLeft: 'Available Groups',
      titleRight: 'Assigned Groups'
    }
  }
};

export default translationUser;
