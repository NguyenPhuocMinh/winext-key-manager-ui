import { useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  TextInputBootStrap,
  SwitchInputBootStrap,
  SimpleFormBootStrap,
  Form
} from 'story-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createRealmAction } from '@customActions/index';
import { validateCreateRealm } from '@validators/index';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const RealmCreate = (props) => {
  const { navigate } = props;

  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  // initialValue
  const initialValues = {
    name: '',
    activated: true
  };

  const handleCreate = useCallback(
    async (params) => {
      dispatch(createRealmAction({ navigate }, params));
    },
    [dispatch, navigate]
  );

  const { loading } = useSelector((state) => {
    return {
      loading: get(state, 'realm.loading', false)
    };
  });

  const handleCancel = () => {
    navigate('/realm-list');
  };

  return (
    <Box>
      <SimpleFormBootStrap
        initialValues={initialValues}
        onSubmit={(values) => handleCreate(values)}
        validationSchema={validateCreateRealm(translate)}
        formContent={(formProps) =>
          RealmCreateForm(formProps, {
            classes,
            translate,
            handleCancel,
            loading
          })
        }
      />
      <NotificationBootStrap />
    </Box>
  );
};

const RealmCreateForm = (formProps, options = {}) => {
  const { handleSubmit, isValid, dirty } = formProps;
  const { classes, translate, handleCancel, loading } = options;

  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 400 }}>
        <Card>
          <CardHeader
            sx={{
              background: (theme) => theme.palette.primary.main
            }}
            subheader={
              <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {translate('resources.configures.realms.title.create')}
                </Typography>
              </Box>
            }
          />
          <Divider sx={{ width: '100%' }} />
          <CardContent>
            <Box
              sx={{
                marginTop: '1em',
                display: 'flex',
                justifyContent: 'flex-start'
              }}
            >
              <TextInputBootStrap
                label="resources.configures.realms.fields.name"
                required
                id="name"
                source="name"
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
                id="activated"
                source="activated"
                label="resources.configures.realms.fields.activated"
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
      </Box>
    </Form>
  );
};

export default RealmCreate;
