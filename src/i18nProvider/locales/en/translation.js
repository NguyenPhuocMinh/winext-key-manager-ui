const TRANSLATIONS_EN = {
  title: 'KeyManager Store',
  auth: {
    auth_check_error: 'Please login to continue',
    auth_check_expired: 'Token expired',
    user_menu: 'Profile',
    username: 'Username',
    password: 'Password',
    sign_in: 'Sign in',
    sign_in_error: 'Authentication failed, please retry',
    logout: 'Logout'
  },
  admin: {
    title: 'Key Manager Store',
    labels: {
      first_name: 'First Name',
      last_name: 'Last Name',
      userName: 'User name',
      password: 'Password',
      password_confirm: 'Password Confirm',
      remember_me: 'Remember me'
    },
    texts: {
      or: 'OR',
      not_account: "Don't have an account?",
      has_account: 'You have an account?',
      welcome: 'Welcome To',
      subtitle: 'The Key Manager Store!',
      description: 'Page for admin manager key of Applications.'
    },
    forgotPass: 'Forgot Password?',
    actions: {
      login: 'Login',
      login_google: 'Login with Google',
      login_facebook: 'Login with Facebook',
      register_account: 'Create an account'
    },
    notification: {
      register: {
        success: 'Register user successfully!',
        duplicate_email: 'Duplicate email',
        password_confirm_not_match:
          'Password confirm not match current password'
      },
      login: {
        success: 'Login successfully!',
        email_not_found: 'Email not found',
        incorrect_password: 'Incorrect Password'
      },
      logout: {
        success: 'Logout successfully!'
      }
    }
  },
  appBar: {
    toolbar: {
      title: 'Welcome to key manager store page',
      tooltip: {
        github: 'Github of page',
        change_language: 'Change language',
        change_setting: 'Change setting',
        change_profile: 'Change profile',
        notification: 'Notification',
        refresh: 'Refresh'
      },
      language: {
        en: 'English',
        vn: 'VietNam'
      },
      setting: {
        title: 'Settings',
        mode: 'Mode',
        themes: {
          light: 'Light',
          dark: 'Dark'
        }
      },
      profile: {
        show_profile: 'My Profile',
        logout: 'Logout'
      }
    }
  },
  resources: {
    dashboard: {
      name: 'Dash board',
      welcome: {
        title: 'Welcome to the admin page e-commerce demo',
        subtitle: 'This is the admin of poster story book shop'
      },
      report: {
        weeklySales: 'Weekly Sales',
        newCustomers: 'New Customers',
        itemOrders: 'Item Orders',
        pendingOrders: 'Pending Orders'
      },
      chart: {
        line: {
          title: 'Sales Statistic Chart',
          labels: {
            jan: 'Jan',
            feb: 'Feb',
            mar: 'Mar',
            apr: 'Apr',
            may: 'May',
            jun: 'Jun',
            july: 'July',
            aug: 'Aug',
            sep: 'Sep',
            oct: 'Oct',
            nov: 'Nov',
            dec: 'Dec'
          },
          datasets: {
            labels: {
              newVisitor: 'New Visitor',
              repeatedUser: 'Repeated User',
              subscriber: 'Subscriber',
              share: 'Share'
            }
          }
        },
        pie: {
          title: 'Current Visits Chart',
          labels: {
            america: 'America',
            asia: 'Asia',
            europe: 'Europe',
            africa: 'Africa'
          },
          datasets: {
            labels: {
              newVisitor: 'New Visitor',
              repeatedUser: 'Repeated User',
              subscriber: 'Subscriber',
              share: 'Share'
            }
          }
        }
      },
      quickReport: {
        newCustomers: 'New Customers',
        pendingOrders: 'Pending Orders',
        bestSalesman: 'Best Salesman',
        top5: 'Top 5',
        seller: 'Seller',
        product: 'Product',
        country: 'Country',
        total: 'Total',
        rank: 'Rank'
      },
      news: {
        newBooks: 'New books',
        favoriteAuthors: 'Favorite top author'
      }
    },
    configures: {
      name: 'Configure',
      realms: {
        name: 'Realm',
        list: {
          button_create: 'Create',
          fields: {
            name: 'Realm name',
            titleName: 'Title name',
            activated: 'Enable',
            createdAt: 'Created Date'
          },
          search: {
            name: 'Search realm name'
          },
          popup: {
            title: 'Delete Realm',
            content:
              'Are you sure you want to permanently delete the realm {{realmName}}?'
          }
        },
        create: {
          title: 'Create new Realm',
          fields: {
            name: 'Realm name',
            activated: 'Enable'
          },
          button_save: 'Save',
          button_cancel: 'Cancel'
        },
        edit: {
          title: 'Edit Realm',
          fields: {
            name: 'Realm name',
            titleName: 'Title name',
            activated: 'Enable'
          },
          tabs: {
            general: 'General',
            keys: 'Keys',
            email: 'Email',
            token: 'Token'
          },
          button_save: 'Save',
          button_cancel: 'Cancel',
          popup: {
            title: 'Delete Realm',
            content:
              'Are you sure you want to permanently delete the realm {{realmName}}?'
          }
        }
      },
      clients: {
        name: 'Clients'
      },
      roles: {
        name: 'Roles'
      }
    },
    manages: {
      name: 'Manage',
      groups: {
        name: 'Groups'
      },
      users: {
        name: 'Users'
      },
      sessions: {
        name: 'Sessions'
      }
    }
  },
  page: {
    error: {
      name: 'Something went wrong',
      message:
        "A client error occurred and your request couldn't be completed.",
      message_text: 'Need help with this error? Try the following',
      message_help: 'Get help from the core team via',
      search_on: 'Search on',
      community_answers: 'for community answers'
    },
    not_found: {
      name: 'Not found',
      message: 'Either you typed a wrong URL, or you followed a bad link.'
    }
  },
  actions: {
    button: {
      back: 'Back'
    }
  },
  validation: {
    required: 'Required',
    minLength: 'Must be {{min}} characters at least',
    maxLength: 'Must be {{max}} characters or less',
    minValue: 'Must be at least {{min}}',
    maxValue: 'Must be {{max}} or less',
    users: {
      email: 'Email does not match format',
      password:
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      password_confirm: 'Password confirm does not match password'
    }
  },
  common: {
    action: {
      undo: 'Undo'
    },
    button: {
      viewAll: 'View All',
      filter: 'Filter',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    logout: {
      success: 'Logout successfully!'
    },
    search: 'Search',
    noRows: 'No rows'
  },
  routes: {
    dashBoard: {
      label: 'DashBoard'
    },
    configure: {
      label: 'Configure',
      child: {
        realm: {
          label: 'Realm'
        },
        role: {
          label: 'Role'
        }
      }
    },
    manage: {
      label: 'Manage',
      child: {
        group: {
          label: 'Group'
        },
        user: {
          label: 'User'
        },
        session: {
          label: 'Session'
        }
      }
    }
  },
  notifications: {
    realms: {
      create: {
        success: 'Create realm success'
      },
      delete: {
        success: 'Delete realm success'
      },
      update: {
        success: 'Update realm success'
      }
    }
  }
};

export default TRANSLATIONS_EN;
