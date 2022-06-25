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
        <MenuItemBootStrap
          to={{
            pathname: '/role-list',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.configures.roles.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="PlaylistRemove"
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
            pathname: '/sessions',
            state: { _scrollToTop: true }
          }}
          primaryText={translate('resources.manages.sessions.name', {
            smart_count: 2
          })}
          registerIcons={registerIcons}
          leftIcon="ManageHistory"
        />
      </SubMenuBootStrap>
      <NavDivider />
    </NavBar>
  );
};

export default Menu;
