import translationAdmin from './translation-admin';
import translationCommon from './translation-common';
import translationRoutes from './translation-routes';
import translationAppBar from './translation-appbar';
import translationPage from './translation-page';
import translationValidation from './translation-validation';
import translationAuth from './translation-auth';
// resources
import translationRealm from './translation-realm';
import translationGroup from './translation-group';
import translationUser from './translation-user';
import translationRole from './translation-role';
import translationPermission from './translation-permission';
import translationProvider from './translation-provider';

const TRANSLATIONS_EN = {
  title: 'KeyManager Store',
  common: translationCommon,
  routes: translationRoutes,
  appBar: translationAppBar,
  page: translationPage,
  validation: translationValidation,
  auth: translationAuth,
  admin: translationAdmin,
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
      realms: translationRealm,
      providers: translationProvider,
      clients: {
        name: 'Clients'
      }
    },
    manages: {
      name: 'Manage',
      groups: translationGroup,
      users: translationUser,
      roles: translationRole,
      permissions: translationPermission,
      sessions: {
        name: 'Sessions'
      }
    }
  },
  actions: {
    button: {
      back: 'Back'
    },
    title: 'Actions'
  }
};

export default TRANSLATIONS_EN;
