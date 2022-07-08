const translationGroup = {
  name: 'Groups',
  title: {
    create: 'Create Group',
    edit: 'Edit Group'
  },
  fields: {
    id: 'ID',
    createdAt: 'createdAt',
    name: 'Group Name',
    description: 'Description',
    activated: 'Enable',
    realmName: 'Realm',
    users: {
      userName: 'Username',
      firstName: 'First Name',
      email: 'Email',
      lastName: 'Last Name'
    }
  },
  tabs: {
    details: 'Details',
    usersInGroup: 'Users In Group'
  },
  popup: {
    title: 'Delete Group',
    content:
      'Are you sure you want to permanently delete the group {{groupName}}-{{realmName}}?'
  },
  search: 'Search by group name',
  notifications: {
    errors: {
      duplicateName: 'Duplicate Group Name',
      duplicateGroupOrRealmName: 'Duplicate Group Or Realm Name',
      notfound: {
        id: 'GroupID Not Found'
      }
    },
    success: {
      get: 'Get All Group Success',
      create: 'Create Group Success',
      update: 'Update Group Success'
    }
  }
};

export default translationGroup;
