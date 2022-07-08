import { useState, useMemo, useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  useFormik
} from 'story-bootstrap';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import {
  addRolesToPermissionAction,
  resetPermissionRecord
} from '@customActions/index';
import { TransferListCommon } from '@components/Common';

const SetRolesToPerTab = (props) => {
  const { navigate } = props;

  // hooks
  const { translate } = useTranslate();

  const dispatch = useDispatch();

  const { record, loading } = useSelector((state) => {
    return {
      record: get(state, 'permission.record', {}),
      loading: get(state, 'permission.loading', false)
    };
  });

  const [dataLeft, setDataLeft] = useState(record.availableRoles ?? []);
  const [dataRight, setDataRight] = useState(record.assignedRoles ?? []);

  const initialValues = useMemo(() => {
    return {
      assignedRoles: record?.assignedRoles ?? []
    };
  }, [record]);

  const handleUpdate = (perID, values) => {
    dispatch(addRolesToPermissionAction(perID, values));
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
    onSubmit: (values) => handleUpdate(record.id, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader={
              <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {translate('resources.manages.permissions.title.tabs.roles')}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Box
              sx={{
                marginTop: '1em',
                display: 'flex'
              }}
            >
              <TransferListCommon
                titleLeft="resources.manages.permissions.transferList.roles.titleLeft"
                titleRight="resources.manages.permissions.transferList.roles.titleRight"
                dataLeft={dataLeft}
                dataRight={dataRight}
                setDataLeft={setDataLeft}
                setDataRight={setDataRight}
                source="assignedRoles"
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

export default SetRolesToPerTab;
