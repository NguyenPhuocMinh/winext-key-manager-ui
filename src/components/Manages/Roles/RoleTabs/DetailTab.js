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
import { updateRoleByIdAction, resetRoleRecord } from '@customActions/index';

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
      record: get(state, 'role.record', {}),
      loading: get(state, 'role.loading', false)
    };
  });

  const initialValues = useMemo(() => {
    return {
      id: record?.id ?? '-',
      createdAt: formatDateTime(record?.createdAt),
      name: record?.name ?? '-',
      description: record?.description ?? '',
      activated: record?.activated ?? false,
      realmName: record?.realmName ?? '-'
    };
  }, [record]);

  const handleUpdate = (roleID, values) => {
    dispatch(
      updateRoleByIdAction(roleID, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        activated: values.activated
      })
    );
  };

  const handleCancel = useCallback(() => {
    setTimeout(() => {
      dispatch(resetRoleRecord());
    });
    navigate('/role-list');
  }, [dispatch, navigate]);

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    enableReinitialize: true,
    initialValues,
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
                  label="resources.manages.roles.fields.id"
                  disabled
                  id="id"
                  source="id"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.roles.fields.createdAt"
                  disabled
                  id="createdAt"
                  source="createdAt"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.roles.fields.name"
                  disabled
                  id="name"
                  source="name"
                  className={classes.input}
                  {...rest}
                />
              </Box>
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInputBootStrap
                label="resources.manages.roles.fields.description"
                multiline
                rows={4}
                id="description"
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

export default DetailTab;
