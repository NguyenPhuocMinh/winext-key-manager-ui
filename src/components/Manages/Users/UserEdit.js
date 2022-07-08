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
import { getUserByIdAction } from '@customActions/index';
import { TabPanelCommon } from '@components/Common';
import { useParams } from 'react-router-dom';
import { tabs } from './UserUtils';
// tabs
import DetailTab from './UserTabs/DetailTab';
import CredentialTab from './UserTabs/CredentialTab';
import RoleTab from './UserTabs/RoleTab';
import GroupTab from './UserTabs/GroupTab';

const UserEdit = (props) => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { userID } = params;

  useEffect(() => {
    dispatch(getUserByIdAction(userID));
  }, [dispatch, userID]);

  const _ = useSelector((state) => state);

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
                {translate('resources.manages.users.title.edit')}
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
                      `resources.manages.users.tabs.${tab.label}`
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
                  <CredentialTab {...props} />
                ) : tabName === tabs[2].label ? (
                  <RoleTab {...props} />
                ) : tabName === tabs[3].label ? (
                  <GroupTab {...props} />
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

export default React.memo(UserEdit);
