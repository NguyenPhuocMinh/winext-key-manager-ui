import { useCallback } from 'react';
import {
  useTranslate,
  TextInputBootStrap,
  SwitchInputBootStrap,
  NotificationBootStrap,
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
import { validatePermission } from '@validators/index';
import { createPermissionAction } from '@customActions/index';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const PermissionCreate = (props) => {
  const { navigate } = props;

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  // initialValue
  const initialValues = {
    name: '',
    description: '',
    activated: true
  };

  const { loading } = useSelector((state) => {
    return {
      loading: get(state, 'permission.loading', false)
    };
  });

  const handleCreate = useCallback(
    async (params) => {
      dispatch(createPermissionAction({ navigate }, params));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/permission-list');
  };

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    initialValues,
    validationSchema: validatePermission(translate),
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
                  {translate('resources.manages.permissions.title.create')}
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
                label="resources.manages.permissions.fields.name"
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
              <TextInputBootStrap
                label="resources.manages.permissions.fields.description"
                id="description"
                multiline
                rows={4}
                source="description"
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
                label="resources.manages.permissions.fields.activated"
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

export default PermissionCreate;
