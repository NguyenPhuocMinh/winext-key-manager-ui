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
import { getRealmByIdAction } from '@customActions/index';
import { TabPanelCommon } from '@components/Common';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { tabs } from './RealmUtils';
// tabs
import GeneralTab from './RealmTabs/GeneralTab';
import KeyTab from './RealmTabs/KeyTab';
import EmailTab from './RealmTabs/EmailTab';
import TokenTab from './RealmTabs/TokenTab';
import UsersInRealmTab from './RealmTabs/UsersInRealmTab';
import GroupsInRealmTab from './RealmTabs/GroupsInRealmTab';

const RealmEdit = (props) => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { realmID } = params;

  useEffect(() => {
    dispatch(getRealmByIdAction(realmID));
  }, [dispatch, realmID]);

  const { record } = useSelector((state) => {
    return {
      record: get(state, 'realm.record', {})
    };
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{
            background: (theme) => theme.palette.primary.main,
            '& .MuiTypography-root': {
              color: (theme) => theme.palette.secondary.contrastText
            }
          }}
          subheader={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                {translate('resources.configures.realms.title.edit')}
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
                      `resources.configures.realms.tabs.${tab.label}`
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
                  <GeneralTab {...props} />
                ) : tabName === tabs[1].label ? (
                  <KeyTab {...props} realmName={record?.name ?? ''} />
                ) : tabName === tabs[2].label ? (
                  <EmailTab {...props} realmName={record?.name ?? ''} />
                ) : tabName === tabs[3].label ? (
                  <TokenTab {...props} realmName={record?.name ?? ''} />
                ) : tabName === tabs[4].label ? (
                  <UsersInRealmTab {...props} realmName={record?.name ?? ''} />
                ) : tabName === tabs[5].label ? (
                  <GroupsInRealmTab {...props} realmName={record?.name ?? ''} />
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

export default React.memo(RealmEdit);
