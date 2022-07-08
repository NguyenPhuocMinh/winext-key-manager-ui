import { useCallback, useEffect, useMemo } from 'react';
import {
  TextInputBootStrap,
  SwitchInputBootStrap,
  useTranslate,
  useFormik
} from 'story-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveEmailByRealmAction,
  getEmailByRealmAction,
  resetRealmRecord
} from '@customActions/index';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { validateEmail } from '@validators/index';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const EmailTab = (props) => {
  const { navigate, realmName } = props;

  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailByRealmAction(realmName));
  }, [dispatch, realmName]);

  const { record, loading } = useSelector((state) => {
    return {
      record: get(state, 'email.record', {}),
      loading: get(state, 'email.loading', {})
    };
  });

  const handleUpdate = (realm, values) => {
    dispatch(saveEmailByRealmAction(realm, { titleName: values.titleName }));
  };

  const handleCancel = useCallback(() => {
    setTimeout(() => {
      dispatch(resetRealmRecord());
    });
    navigate('/realm-list');
  }, [dispatch, navigate]);

  const initialValues = useMemo(() => {
    return {
      host: record?.host ?? '',
      port: record?.port ?? '',
      fromDisplayName: record?.fromDisplayName ?? '',
      from: record?.from ?? '',
      replyToDisplayName: record?.replyToDisplayName ?? '',
      replyTo: record?.replyTo ?? '',
      enableSSL: record?.enableSSL ?? false,
      enableStartSSL: record?.enableStartSSL ?? false,
      enableAuthorization: record?.enableAuthorization ?? false
    };
  }, [record]);

  const formProps = useFormik({
    enableReinitialize: true, // for render data init when edit
    initialValues,
    validationSchema: validateEmail(translate),
    onSubmit: (values) => handleUpdate(realmName, values)
  });

  return (
    <form onSubmit={formProps.handleSubmit}>
      <Card>
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.host"
              required
              id="host"
              source="host"
              className={classes.input}
              {...formProps}
            />
            <Button
              sx={{
                width: 'auto',
                minWidth: 150,
                borderRadius: 12,
                textTransform: 'capitalize',
                ':hover': {
                  background: 'none'
                }
              }}
              variant="contained"
              disabled={!formProps.isValid || !formProps.dirty}
            >
              {translate('common.button.testConnection')}
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.port"
              id="port"
              source="port"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.fromDisplayName"
              id="fromDisplayName"
              source="fromDisplayName"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.from"
              required
              id="from"
              source="from"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.replyToDisplayName"
              id="replyToDisplayName"
              source="replyToDisplayName"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.emails.replyTo"
              id="replyTo"
              source="replyTo"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <SwitchInputBootStrap
              label="resources.configures.realms.fields.emails.enableSSL"
              id="enableSSL"
              source="enableSSL"
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <SwitchInputBootStrap
              label="resources.configures.realms.fields.emails.enableStartTLS"
              id="enableStartTLS"
              source="enableStartTLS"
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex'
            }}
          >
            <SwitchInputBootStrap
              label="resources.configures.realms.fields.emails.enableAuthentication"
              id="enableAuthentication"
              source="enableAuthentication"
              {...formProps}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              width: 'auto',
              minWidth: 150,
              borderRadius: 12,
              textTransform: 'capitalize',
              ':hover': {
                background: 'none'
              }
            }}
            variant="contained"
            type="submit"
            disabled={!formProps.isValid || !formProps.dirty}
          >
            {loading && (
              <CircularProgress
                sx={{ marginRight: '5px' }}
                color="primary"
                size={20}
                thickness={2}
              />
            )}
            {translate('common.button.save')}
          </Button>
          <Button
            sx={{
              width: 'auto',
              minWidth: 150,
              borderRadius: 12,
              textTransform: 'capitalize',
              ':hover': {
                background: 'none'
              }
            }}
            variant="outlined"
            onClick={handleCancel}
          >
            {translate('common.button.cancel')}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default EmailTab;
