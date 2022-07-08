const translationRealm = {
  name: 'Realm',
  title: {
    create: 'Create Realm',
    edit: 'Edit Realm'
  },
  fields: {
    name: 'Realm name',
    titleName: 'Title name',
    activated: 'Enable',
    createdAt: 'createdAt',
    frontEndURL: 'Frontend URL',
    tooltip: {
      frontEndURL: 'Set the frontend for the realm',
      activated: 'Users and clients can only access if realm enabled'
    },
    users: {
      userName: 'Username',
      firstName: 'First Name',
      email: 'Email',
      lastName: 'Last Name',
      activated: 'Enable'
    },
    groups: {
      name: 'Group Name',
      activated: 'Enable'
    },
    emails: {
      host: 'Host',
      port: 'Port',
      fromDisplayName: 'From Display Name',
      from: 'From',
      replyToDisplayName: 'Reply To Display Name',
      replyTo: 'Reply To',
      realmName: 'RealmName',
      activated: 'Enable',
      enableSSL: 'Enable SSL',
      enableStartTLS: 'Enable StartTLS',
      enableAuthentication: 'Enable Authentication',
      testConnection: 'Test Connection'
    },
    keys: {
      name: 'Key Name',
      priority: 'Priority',
      useFor: 'Use For',
      keySize: 'Key Size',
      algorithm: 'Algorithm',
      activated: 'Enable'
    },
    tokens: {
      signatureAlgorithm: 'Signature Algorithm',
      expired: 'Expired',
      tooltip: {
        signatureAlgorithm:
          'Default algorithm used to sign tokens for the realm',
        expired: 'Expired tokens for the realm'
      }
    }
  },
  tabs: {
    general: 'General',
    keys: 'Keys',
    email: 'Email',
    token: 'Token',
    usersInRealm: 'Users In Realm',
    groupsInRealm: 'Groups In Realm',
    keyTabs: {
      active: 'Active',
      disabled: 'Disabled',
      provider: 'Providers'
    }
  },
  popup: {
    title: 'Delete Realm',
    content:
      'Are you sure you want to permanently delete the realm {{realmName}}?'
  },
  search: 'Search by realm',
  notifications: {
    errors: {
      duplicateName: 'Duplicate Realm Name'
    },
    success: {
      create: 'Create realm success',
      update: 'Update realm success',
      saveKey: 'Save key in realm success'
    },
    notfound: {
      id: 'realmID not found'
    }
  }
};

export default translationRealm;
