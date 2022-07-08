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
import {
  updatePermissionByIdAction,
  resetPermissionRecord
} from '@customActions/index';
import { validatePermission } from '@validators/index';

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
      record: get(state, 'permission.record', {}),
      loading: get(state, 'permission.loading', false)
    };
  });

  const initialValues = useMemo(() => {
    return {
      id: record?.id ?? '-',
      createdAt: formatDateTime(record?.createdAt),
      name: record?.name ?? '-',
      description: record?.description ?? '',
      activated: record?.activated ?? false
    };
  }, [record]);

  const handleUpdate = (roleID, values) => {
    dispatch(
      updatePermissionByIdAction(roleID, {
        name: values.name,
        description: values.description,
        activated: values.activated
      })
    );
  };

  const handleCancel = useCallback(() => {
    setTimeout(() => {
      dispatch(resetPermissionRecord());
    });
    navigate('/permission-list');
  }, [dispatch, navigate]);

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validatePermission(translate),
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
                  label="resources.manages.permissions.fields.id"
                  disabled
                  id="id"
                  source="id"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.permissions.fields.createdAt"
                  disabled
                  id="createdAt"
                  source="createdAt"
                  className={classes.input}
                  {...rest}
                />
              </Box>
              <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
                <TextInputBootStrap
                  label="resources.manages.permissions.fields.name"
                  required
                  id="name"
                  source="name"
                  className={classes.input}
                  {...rest}
                />
              </Box>
            </Box>
            <Box sx={{ marginRight: '2em', marginBottom: '2em' }}>
              <TextInputBootStrap
                label="resources.manages.permissions.fields.description"
                id="description"
                source="description"
                rows={4}
                multiline
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
