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

const TRANSLATIONS_VN = {
  title: 'Quản lý khóa',
  common: translationCommon,
  routes: translationRoutes,
  appBar: translationAppBar,
  page: translationPage,
  validation: translationValidation,
  auth: translationAuth,
  admin: translationAdmin,
  resources: {
    dashboard: {
      name: 'Trang chủ',
      welcome: {
        title:
          'Chào mừng bạn đến với bản demo thương mại điện tử của trang quản trị',
        subtitle: 'Đây là quản trị viên của cửa hàng sách truyện'
      },
      report: {
        weeklySales: 'Doanh số hàng tuần',
        newCustomers: 'Khách hàng mới',
        itemOrders: 'Đơn đặt hàng',
        pendingOrders: 'Hàng đang chờ xử lý'
      },
      chart: {
        line: {
          title: 'Biểu đồ thống kê bán hàng',
          labels: {
            jan: 'Tháng 1',
            feb: 'Tháng 2',
            mar: 'Tháng 3',
            apr: 'Tháng 4',
            may: 'Tháng 5',
            jun: 'Tháng 6',
            july: 'Tháng 7',
            aug: 'Tháng 8',
            sep: 'Tháng 9',
            oct: 'Tháng 10',
            nov: 'Tháng 11',
            dec: 'Tháng 12'
          },
          datasets: {
            labels: {
              newVisitor: 'Khách mới',
              repeatedUser: 'Khách lặp lại',
              subscriber: 'Khách đăng ký',
              share: 'Khách chia sẻ'
            }
          }
        },
        pie: {
          title: 'Biểu đồ lượt truy cập hiện tại',
          labels: {
            america: 'Châu mỹ',
            asia: 'Châu Á',
            europe: 'Châu Âu',
            africa: 'Châu phi'
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
        newCustomers: 'Khách hàng mới',
        pendingOrders: 'Hàng đang chờ xử lý',
        bestSalesman: 'Nhân viên bán hàng tốt nhất',
        top5: 'Top 5',
        seller: 'Người bán',
        product: 'Sản phẩm',
        country: 'Quốc gia',
        total: 'Tổng cộng',
        rank: 'Cấp hạng'
      },
      news: {
        newBooks: 'Những cuốn sách mới',
        favoriteAuthors: 'Tác giả hàng đầu được yêu thích'
      }
    },
    configures: {
      name: 'Cấu hình',
      realms: translationRealm,
      providers: translationProvider,
      clients: {
        name: 'Máy khách'
      }
    },
    manages: {
      name: 'Quản lý',
      groups: translationGroup,
      users: translationUser,
      roles: translationRole,
      permissions: translationPermission,
      sessions: {
        name: 'Phiên hoạt động'
      }
    }
  },
  actions: {
    button: {
      back: 'Quay lại'
    },
    title: 'Thao tác'
  }
};

export default TRANSLATIONS_VN;
