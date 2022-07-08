const translationPermission = {
  name: 'Permissions',
  title: {
    create: 'Create Permission',
    edit: 'Edit Permission',
    tabs: {
      roles: 'Set Roles'
    }
  },
  fields: {
    id: 'ID',
    createdAt: 'createdAt',
    name: 'Permission Name',
    description: 'Description',
    activated: 'Enable'
  },
  tabs: {
    details: 'Details',
    attributes: 'Attributes',
    setRolesToPermission: 'Set Roles To Permission'
  },
  popup: {
    title: 'Delete Permission',
    content:
      'Are you sure you want to permanently delete the permission {{permissionName}}?'
  },
  search: 'Search by permission name',
  notifications: {
    errors: {
      duplicatePermission: 'Duplicate Permission Name',
      idNotFound: 'PermissionID not found',
      nameNotFound: 'Permission not found'
    },
    success: {
      create: 'Create permission success',
      update: 'Update permission success',
      delete: 'Delete permission success',
      addRoles: 'Set roles to permission success'
    }
  },
  transferList: {
    roles: {
      titleLeft: 'Available Roles',
      titleRight: 'Assigned Roles'
    }
  }
};

export default translationPermission;
