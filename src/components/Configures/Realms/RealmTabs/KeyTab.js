import { useCallback, useEffect, useMemo } from 'react';
import {
  NotificationBootStrap,
  NumberInputBootStrap,
  SelectInputBootStrap,
  TextInputBootStrap,
  SwitchInputBootStrap,
  useTranslate,
  useFormik
} from 'story-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetRealmRecord,
  saveKeyByRealmAction,
  getKeyByRealmAction
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
import { validateKey } from '@validators/index';
import { get } from 'lodash';
import constants from '@constants';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const KeyTab = (props) => {
  const { navigate, realmName } = props;

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKeyByRealmAction(realmName));
  }, [dispatch, realmName]);

  const { record, loading } = useSelector((state) => {
    return {
      record: get(state, 'key.record', {}),
      loading: get(state, 'key.loading', false)
    };
  });

  const handleUpdate = (realm, values) => {
    dispatch(
      saveKeyByRealmAction(realm, {
        name: values.name,
        useFor: constants.USE_FOR_DEFAULT,
        priority: values.priority,
        activated: values.activated,
        keySize: values.keySize,
        algorithm: values.algorithm
      })
    );
  };

  const handleCancel = useCallback(() => {
    setTimeout(() => {
      dispatch(resetRealmRecord());
    });
    navigate('/realm-list');
  }, [dispatch, navigate]);

  const initialValues = useMemo(() => {
    return {
      name: record?.name ?? '',
      useFor: record?.useFor ?? constants.USE_FOR_DEFAULT,
      priority: record?.priority ?? 0,
      activated: record?.activated ?? false,
      keySize: record?.keySize ?? constants.KEY_SIZE_DEFAULT,
      algorithm: record?.algorithm ?? constants.ALGORITHM_DEFAULT
    };
  }, [record]);

  const { handleSubmit, isValid, dirty, ...rest } = useFormik({
    enableReinitialize: true, // for render data init when edit
    initialValues,
    validationSchema: validateKey(translate),
    onSubmit: (values) => handleUpdate(realmName, values)
  });

  return (
    <Box sx={{ minWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Box
              sx={{
                marginTop: '1em',
                display: 'flex'
              }}
            >
              <TextInputBootStrap
                label="resources.configures.realms.fields.keys.name"
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
                label="resources.configures.realms.fields.keys.useFor"
                disabled
                id="useFor"
                source="useFor"
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
              <NumberInputBootStrap
                label="resources.configures.realms.fields.keys.priority"
                id="priority"
                source="priority"
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
                id="keySize"
                source="keySize"
                label="resources.configures.realms.fields.keys.keySize"
                choices={
                  JSON.parse(localStorage.getItem('webConfigs')).keySizes
                }
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
                id="algorithm"
                source="algorithm"
                label="resources.configures.realms.fields.keys.algorithm"
                choices={
                  JSON.parse(localStorage.getItem('webConfigs')).algorithms
                }
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
                label="resources.configures.realms.fields.keys.activated"
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

export default KeyTab;
