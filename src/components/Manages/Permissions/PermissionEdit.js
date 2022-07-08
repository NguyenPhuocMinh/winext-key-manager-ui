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
import { getPermissionByIdAction } from '@customActions/index';
import { TabPanelCommon } from '@components/Common';
import { useParams } from 'react-router-dom';
import { tabs } from './PermissionUtils';

// tabs
import DetailTab from './PermissionTabs/DetailTab';
import AttributeTab from './PermissionTabs/AttributeTab';
import SetRolesToPerTab from './PermissionTabs/SetRolesToPerTab';

const PermissionEdit = (props) => {
  const params = useParams();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const [tabName, setTabName] = useState(tabs[0].label);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  const { perID } = params;

  useEffect(() => {
    dispatch(getPermissionByIdAction(perID));
  }, [dispatch, perID]);

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
                {translate('resources.manages.permissions.title.edit')}
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
                      `resources.manages.permissions.tabs.${tab.label}`
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
                  <AttributeTab {...props} />
                ) : tabName === tabs[2].label ? (
                  <SetRolesToPerTab {...props} />
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

export default React.memo(PermissionEdit);
