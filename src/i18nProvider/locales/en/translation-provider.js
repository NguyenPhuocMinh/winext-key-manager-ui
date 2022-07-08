const translationProvider = {
  name: 'Provider',
  title: {
    create: 'Create Provider',
    edit: 'Edit Provider'
  },
  fields: {
    name: 'Name',
    priority: 'Priority',
    description: 'Description',
    activated: 'Enable',
    keySize: 'Key size',
    algorithm: 'Algorithm'
  },
  choices: {
    keySizes: {
      size_1024: '1024',
      size_2048: '2048',
      size_4096: '4096'
    },
    algorithms: {
      RS256: 'RS256',
      HS256: 'HS256'
    }
  }
};

export default translationProvider;
