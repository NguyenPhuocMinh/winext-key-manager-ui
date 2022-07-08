import {
  SubMenuBootStrap,
  MenuItemBootStrap,
  DashboardItemBootStrap,
  useTranslate
} from 'story-bootstrap';
import { NavBar, NavDivider } from './NavLayout';
import registerIcons from '../registerIcons';

const Menu = ({ hasDashboard }) => {
  // hooks
  const { translate } = useTranslate();

  return (
    <NavBar>
      {hasDashboard && <DashboardItemBootStrap registerIcons={registerIcons} />}
      <NavDivider />
      <SubMenuBootStrap
        primaryText={translate('resources.configures.name')}
        leftIcon="Build"
        registerIcons={registerIcons}
      >
        <MenuItemBootStrap
          to={{
            pathname: '/realm-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.configures.realms.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="Waves"
        />
      </SubMenuBootStrap>
      <NavDivider />
      <SubMenuBootStrap
        primaryText={translate('resources.manages.name')}
        leftIcon="ManageAccounts"
        registerIcons={registerIcons}
      >
        <MenuItemBootStrap
          to={{
            pathname: '/group-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.manages.groups.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="Groups"
        />
        <MenuItemBootStrap
          to={{
            pathname: '/user-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.manages.users.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="Person"
        />
        <MenuItemBootStrap
          to={{
            pathname: '/role-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.manages.roles.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="PlaylistRemove"
        />
        <MenuItemBootStrap
          to={{
            pathname: '/permission-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.manages.permissions.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="SyncLock"
        />
      </SubMenuBootStrap>
      <NavDivider />
    </NavBar>
  );
};

export default Menu;
