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
import { getGroupByIdAction } from '@customActions/index';
import { TabPanelCommon } from '@components/Common';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { tabs } from './GroupUtils';
// tabs
import DetailTab from './GroupTabs/DetailTab';
import UsersInGroupTab from './GroupTabs/UsersInGroupTab';

const GroupEdit = (props) => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { groupID } = params;

  useEffect(() => {
    dispatch(getGroupByIdAction(groupID));
  }, [dispatch, groupID]);

  const { record } = useSelector((state) => {
    return {
      record: get(state, 'group.record', {})
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
                {translate('resources.manages.groups.title.edit')}
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
                      `resources.manages.groups.tabs.${tab.label}`
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
                  <UsersInGroupTab
                    {...props}
                    groupName={record?.name ?? ''}
                    realmName={record?.realmName ?? ''}
                  />
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

export default React.memo(GroupEdit);
