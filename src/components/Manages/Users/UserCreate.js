import { useEffect, useCallback } from 'react';
import {
  useTranslate,
  TextInputBootStrap,
  SwitchInputBootStrap,
  NotificationBootStrap,
  SelectInputBootStrap,
  useFormik
} from 'story-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { validateUserCreate } from '@validators/index';
import { getAllRealmAction, createUserAction } from '@customActions/index';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const UserCreate = (props) => {
  const { navigate } = props;

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  // initialValue
  const initialValues = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    realmName: '',
    activated: true
  };

  useEffect(() => {
    dispatch(getAllRealmAction());
  }, [dispatch]);

  const { loading, realms } = useSelector((state) => {
    return {
      loading: get(state, 'user.loading', false),
      realms: get(state, 'realm.data', [])
    };
  });

  const handleCreate = useCallback(
    async (params) => {
      dispatch(createUserAction({ navigate }, params));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/user-list');
  };

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    initialValues,
    validationSchema: validateUserCreate(translate),
    onSubmit: (values) => handleCreate(values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            sx={{
              background: (theme) => theme.palette.primary.main
            }}
            subheader={
              <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {translate('resources.manages.users.title.create')}
                </Typography>
              </Box>
            }
          />
          <Divider sx={{ width: '100%' }} />
          <CardContent>
            <Box
              sx={{
                marginTop: '1em',
                marginBottom: '1em',
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 800
              }}
            >
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
                <SelectInputBootStrap
                  label="resources.manages.users.fields.realmName"
                  required
                  id="realmName"
                  source="realmName"
                  choices={realms}
                  className={classes.input}
                  {...rest}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: '1em',
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

export default UserCreate;
