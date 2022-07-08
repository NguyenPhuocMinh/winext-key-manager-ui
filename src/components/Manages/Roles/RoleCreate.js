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
import { validateRole } from '@validators/index';
import { createRoleAction } from '@customActions/index';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const RoleCreate = (props) => {
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
      loading: get(state, 'role.loading', false)
    };
  });

  const handleCreate = useCallback(
    async (params) => {
      dispatch(createRoleAction({ navigate }, params));
    },
    [dispatch, navigate]
  );

  const handleCancel = () => {
    navigate('/role-list');
  };

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    initialValues,
    validationSchema: validateRole(translate),
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
                  {translate('resources.manages.roles.title.create')}
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
                label="resources.manages.roles.fields.name"
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
                label="resources.manages.roles.fields.description"
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
                marginTop: '1em',
                display: 'flex'
              }}
            >
              <SwitchInputBootStrap
                id="activated"
                source="activated"
                label="resources.manages.roles.fields.activated"
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

export default RoleCreate;
