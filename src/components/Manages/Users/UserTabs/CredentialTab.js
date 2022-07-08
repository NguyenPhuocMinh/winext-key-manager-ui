import { useState, useMemo, useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  TextInputBootStrap,
  useFormik,
  createIcon
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
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { updateUserByIdAction, resetUserRecord } from '@customActions/index';
import registerIcons from '@registerIcons';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const CredentialTab = (props) => {
  const { navigate } = props;

  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
      password: '',
      passwordConfirm: ''
    };
  }, []);

  const handleUpdate = (userID, values) => {
    dispatch(updateUserByIdAction(userID, values));
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
                  {translate('resources.manages.users.title.tabs.credentials')}
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
              <TextInputBootStrap
                label="resources.manages.users.fields.password"
                id="password"
                source="password"
                type={showPassword ? 'text' : 'password'}
                className={classes.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        border: 'none !important',
                        ':hover': {
                          background: 'none'
                        },
                        marginRight: '-8px !important'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword
                        ? createIcon({ icon: 'VisibilityOff', registerIcons })
                        : createIcon({ icon: 'Visibility', registerIcons })}
                    </IconButton>
                  </InputAdornment>
                }
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
                label="resources.manages.users.fields.passwordConfirm"
                id="passwordConfirm"
                source="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                className={classes.input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        border: 'none !important',
                        ':hover': {
                          background: 'none'
                        },
                        marginRight: '-8px !important'
                      }}
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPasswordConfirm
                        ? createIcon({ icon: 'VisibilityOff', registerIcons })
                        : createIcon({ icon: 'Visibility', registerIcons })}
                    </IconButton>
                  </InputAdornment>
                }
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

export default CredentialTab;
