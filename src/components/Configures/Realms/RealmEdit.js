import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { tabs } from './RealmUtils';
// tabs
import GeneralTab from './RealmTabs/GeneralTab';
import KeyTab from './RealmTabs/KeyTab';
import EmailTab from './RealmTabs/EmailTab';
import TokenTab from './RealmTabs/TokenTab';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

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

  const _ = useSelector((state) => {
    return {
      record: get(state, 'realm.record', {})
    };
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card>
        <CardHeader
          sx={{ background: (theme) => theme.palette.primary.main }}
          subheader={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                {translate('resources.configures.realms.edit.title')}
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
                      `resources.configures.realms.edit.tabs.${tab.label}`
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
              <TabPanel value={tabName} index={tab.label} key={tab.id}>
                {tabName === tabs[0].label ? (
                  <GeneralTab {...props} />
                ) : tabName === tabs[1].label ? (
                  <KeyTab {...props} />
                ) : tabName === tabs[2].label ? (
                  <EmailTab {...props} />
                ) : tabName === tabs[3].label ? (
                  <TokenTab {...props} />
                ) : null}
              </TabPanel>
            );
          })}
        </CardContent>
      </Card>
      <NotificationBootStrap />
    </Box>
  );
};

export default React.memo(RealmEdit);
