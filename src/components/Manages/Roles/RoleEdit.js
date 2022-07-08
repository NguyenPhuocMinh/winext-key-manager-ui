import React, { useState, useEffect } from 'react';
import { useTranslate, NotificationBootStrap } from 'story-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Tab,
  Tabs,
  Divider,
  Typography
} from '@mui/material';
import { getRoleByIdAction } from '@customActions/index';
import { TabPanelCommon } from '@components/Common';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { tabs } from './RoleUtils';
// tabs
import DetailTab from './RoleTabs/DetailTab';
import UserInRoleTab from './RoleTabs/UserInRoleTab';
import PerInRoleTab from './RoleTabs/PerInRoleTab';

const RoleEdit = (props) => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { roleID } = params;

  useEffect(() => {
    dispatch(getRoleByIdAction(roleID));
  }, [dispatch, roleID]);

  const { record } = useSelector((state) => {
    return {
      record: get(state, 'role.record', {})
    };
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{
            background: (theme) => theme.palette.primary.main
          }}
          subheader={
            <Box display="flex" alignItems="center">
              <Typography variant="body2" fontWeight={600}>
                {translate('resources.manages.roles.title.edit')}
              </Typography>
            </Box>
          }
        />
        <Divider sx={{ width: '100%' }} />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabName} onChange={handleChange}>
              {tabs.map((tab) => {
                return (
                  <Tab
                    sx={{
                      textTransform: 'capitalize'
                    }}
                    label={translate(
                      `resources.manages.roles.tabs.${tab.label}`
                    )}
                    value={tab.label}
                    key={tab.id}
                  />
                );
              })}
            </Tabs>
          </Box>
          {tabs.map((tab) => {
            return (
              <TabPanelCommon value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? (
                  <DetailTab {...props} />
                ) : tabName === tabs[1].label ? (
                  <UserInRoleTab {...props} roleName={record?.name ?? ''} />
                ) : tabName === tabs[2].label ? (
                  <PerInRoleTab {...props} roleName={record?.name ?? ''} />
                ) : null}
              </TabPanelCommon>
            );
          })}
        </CardContent>
      </Card>
      <NotificationBootStrap />
    </Box>
  );
};

export default React.memo(RoleEdit);
