import { useMemo, useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  TextInputBootStrap,
  SwitchInputBootStrap,
  useFormik
} from 'story-bootstrap';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatDateTime } from '@helpers/index';
import { validateUserUpdate } from '@validators/index';
import { updateUserByIdAction, resetUserRecord } from '@customActions/index';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const DetailTab = (props) => {
  const { navigate } = props;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();

  const dispatch = useDispatch();

  const { record, loading } = useSelector((state) => {
    return {
      record: get(state, 'user.record', {}),
      loading: get(state, 'user.loading', false)
    };
  });

  const initialValues = useMemo(() => {
    return {
      id: record?.id ?? '-',
      createdAt: formatDateTime(record?.createdAt),
      userName: record?.userName ?? '-',
      email: record?.email ?? '',
      firstName: record?.firstName ?? '',
      lastName: record?.lastName ?? '',
      activated: record?.activated ?? false,
      realmName: record?.realmName ?? '-'
    };
  }, [record]);

  const handleUpdate = (userID, values) => {
    dispatch(
      updateUserByIdAction(userID, {
        userName: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        activated: values.activated
      })
    );
  };

  const handleCancel = useCallback(() => {
    setTimeout(() => {
      dispatch(resetUserRecord());
    });
    navigate('/user-list');
  }, [dispatch, navigate]);

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validateUserUpdate(translate),
    onSubmit: (values) => handleUpdate(record.id, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 800
              }}
            >
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.id"
                  disabled
                  id="id"
                  source="id"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.createdAt"
                  disabled
                  id="createdAt"
                  source="createdAt"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.userName"
                  required
                  id="userName"
                  source="userName"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.email"
                  required
                  id="email"
                  source="email"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.firstName"
                  id="firstName"
                  source="firstName"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.lastName"
                  id="lastName"
                  source="lastName"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.users.fields.realmName"
                  disabled
                  id="realmName"
                  source="realmName"
                  className={classes.input}
                  {...rest}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <SwitchInputBootStrap
                id="activated"
                source="activated"
                label="resources.manages.users.fields.activated"
                {...rest}
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
              disabled={!isValid || !dirty || loading}
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
      <NotificationBootStrap />
    </Box>
  );
};

export default DetailTab;
