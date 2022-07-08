import { useCallback, useState, useEffect, useRef } from 'react';
// story bootstrap
import {
  useAuthProvider,
  defaultAuthParams,
  useTranslate,
  useNotify,
  NotificationBootStrap,
  TextInputBootStrap,
  SimpleFormBootStrap,
  Form
} from 'story-bootstrap';
// material ui
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  alpha,
  Avatar,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
// lodash
import { get } from 'lodash';
// theme
import { lightTheme } from '../../themes';
// validate
import { validateUserLogin } from '../../validators';

const useStyles = makeStyles({
  input: {
    width: 256
  }
});

const LoginPage = (props) => {
  const { location, navigate } = props;
  // state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const authProvider = useAuthProvider();
  const notify = useNotify();
  const timer = useRef();

  // initialValue
  const initialValues = {
    userName: '',
    password: ''
  };

  const locationState = location.state;
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const handleLogin = useCallback(
    (params) => {
      setLoading(true);
      authProvider
        .login(params)
        .then((res) => {
          if (res.status < 200 || res.status >= 400) {
            timer.current = window.setTimeout(() => {
              setLoading(false);
              const errorMessage = get(res, 'data.message');
              notify(`${errorMessage}`, { type: 'warning' });
              localStorage.setItem('authenticated', false);
            }, 500);
          } else {
            timer.current = window.setTimeout(() => {
              setLoading(false);
              localStorage.setItem('authenticated', true);
              const redirectUrl =
                nextPathName + nextSearch || defaultAuthParams.afterLoginUrl;
              notify('admin.notification.login.success', { type: 'success' });
              navigate(redirectUrl);
            }, 500);
          }
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    [authProvider, notify, navigate, nextPathName, nextSearch]
  );

  return (
    <SimpleFormBootStrap
      initialValues={initialValues}
      onSubmit={(values) => handleLogin(values)}
      validationSchema={validateUserLogin(translate)}
      formContent={(formProps) =>
        FormLogin(formProps, {
          classes,
          translate,
          loading,
          setLoading,
          setShowPassword,
          showPassword
        })
      }
    />
  );
};

const FormLogin = (formProps, options = {}) => {
  // options
  const { classes, translate, loading, showPassword, setShowPassword } =
    options;
  // formProps
  const { handleSubmit, isValid, dirty } = formProps;

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url(https://source.unsplash.com/random/1600x900)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            bgcolor: 'background.paper',
            overflow: 'hidden',
            boxShadow: 1,
            fontWeight: 'bold',
            borderRadius: 5
          }}
        >
          <Box
            sx={{
              minWidth: 400
            }}
          >
            <Card>
              <Box
                component="div"
                sx={{
                  margin: '1em',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Avatar alt="" src="https://source.unsplash.com/random" />
              </Box>
              <Box
                component="div"
                sx={{
                  marginTop: '1em',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'primary.main'
                }}
              >
                {translate('admin.title')}
              </Box>
              <CardContent>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="admin.labels.userName"
                    required
                    id="userName"
                    source="userName"
                    endAdornment={
                      <InputAdornment position="end">
                        <PersonIcon />
                      </InputAdornment>
                    }
                    className={classes.input}
                    {...formProps}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="admin.labels.password"
                    source="password"
                    type={showPassword ? 'text' : 'password'}
                    required
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...formProps}
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  padding: '0 1em 1em 1em',
                  justifyContent: 'center'
                }}
              >
                <Button
                  sx={{
                    width: 'auto',
                    minWidth: 256,
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
                  {translate('common.button.login')}
                </Button>
              </CardActions>
            </Card>
          </Box>
          <Box
            sx={{
              display: 'flex',
              minWidth: { md: 500 },
              bgcolor: 'primary.main'
            }}
          >
            <Box
              sx={{
                p: '6.4rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
                {translate('admin.texts.welcome')}
              </Box>
              <Box component="span" sx={{ fontSize: 18 }}>
                {translate('admin.texts.subtitle')}
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  borderRadius: '5px',
                  fontWeight: 'medium',
                  display: 'flex',
                  fontSize: 14,
                  alignItems: 'center',
                  '& svg': {
                    fontSize: 21,
                    mr: 0.5
                  }
                }}
              >
                {translate('admin.texts.description')}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <NotificationBootStrap />
    </Form>
  );
};

const LoginWithTheme = (props) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LoginPage {...props} />
    </ThemeProvider>
  );
};

export default LoginWithTheme;
