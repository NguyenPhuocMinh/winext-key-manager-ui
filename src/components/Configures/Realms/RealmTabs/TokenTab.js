import { useCallback, useEffect, useMemo } from 'react';
import {
  SelectInputBootStrap,
  NumberInputBootStrap,
  useTranslate,
  useFormik
} from 'story-bootstrap';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetRealmRecord,
  saveTokenByRealmAction,
  getTokenByRealmAction
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
import { ContactSupportCommon } from '@components/Common';
import constants from '@constants';

const useStyles = makeStyles({
  input: {
    width: 500
  }
});

const TokenTab = (props) => {
  const { navigate, realmName } = props;

  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenByRealmAction(realmName));
  }, [dispatch, realmName]);

  const { record, loading } = useSelector((state) => {
    return {
      record: get(state, 'token.record', {}),
      loading: get(state, 'token.loading', false)
    };
  });

  const handleUpdate = (realm, values) => {
    dispatch(
      saveTokenByRealmAction(realm, {
        signatureAlgorithm: values.signatureAlgorithm,
        expired: values.expired
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
      signatureAlgorithm:
        record?.signatureAlgorithm ?? constants.ALGORITHM_DEFAULT,
      expired: record?.expired ?? 0
    };
  }, [record]);

  const formProps = useFormik({
    enableReinitialize: true, // for render data init when edit
    initialValues,
    onSubmit: (values) => handleUpdate(realmName, values)
  });

  return (
    <form onSubmit={formProps.handleSubmit}>
      <Card>
        <CardContent>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SelectInputBootStrap
              label="resources.configures.realms.fields.tokens.signatureAlgorithm"
              id="signatureAlgorithm"
              source="signatureAlgorithm"
              choices={
                JSON.parse(localStorage.getItem('webConfigs')).algorithms
              }
              className={classes.input}
              {...formProps}
            />
            <ContactSupportCommon title="resources.configures.realms.fields.tokens.tooltip.signatureAlgorithm" />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <NumberInputBootStrap
              label="resources.configures.realms.fields.tokens.expired"
              id="expired"
              source="expired"
              className={classes.input}
              {...formProps}
            />
            <ContactSupportCommon title="resources.configures.realms.fields.tokens.tooltip.signatureAlgorithm" />
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
            disabled={!formProps.isValid || !formProps.dirty}
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
  );
};

export default TokenTab;
