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
import { validateGroup } from '@validators/index';
import { getAllRealmAction, createGroupAction } from '@customActions/index';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const GroupCreate = (props) => {
  const { navigate } = props;

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  // initialValue
  const initialValues = {
    name: '',
    realmName: '',
    activated: true
  };

  useEffect(() => {
    dispatch(getAllRealmAction());
  }, [dispatch]);

  const { loading, realms } = useSelector((state) => {
    return {
      loading: get(state, 'group.loading', false),
      realms: get(state, 'realm.data', [])
    };
  });

  const handleCreate = useCallback(
    async (params) => {
      dispatch(createGroupAction({ navigate }, params));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/group-list');
  };

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    initialValues,
    validationSchema: validateGroup(translate),
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
                  {translate('resources.manages.groups.title.create')}
                </Typography>
              </Box>
            }
          />
          <Divider sx={{ width: '100%' }} />
          <CardContent>
            <Box
              sx={{
                marginTop: '1em',
                display: 'flex'
              }}
            >
              <TextInputBootStrap
                label="resources.manages.groups.fields.name"
                required
                id="name"
                source="name"
                className={classes.input}
                {...rest}
              />
            </Box>
            <Box
              sx={{
                marginTop: '1em',
                display: 'flex'
              }}
            >
              <SelectInputBootStrap
                label="resources.manages.groups.fields.realmName"
                required
                id="realmName"
                source="realmName"
                choices={realms}
                className={classes.input}
                {...rest}
              />
            </Box>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <SwitchInputBootStrap
                id="activated"
                source="activated"
                label="resources.manages.groups.fields.activated"
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

export default GroupCreate;
