import { useCallback, useMemo } from 'react';
import {
  TextInputBootStrap,
  SwitchInputBootStrap,
  useTranslate,
  useFormik
} from 'story-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { resetRealmRecord, updateRealmByIdAction } from '@customActions/index';
import { Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ContactSupportCommon } from '@components/Common';
import { validateCreateRealm } from '@validators/index';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 350
  }
});

const GeneralTab = (props) => {
  const { navigate } = props;

  const classes = useStyles();
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  const { record } = useSelector((state) => {
    return {
      record: get(state, 'realm.record', {})
    };
  });

  const handleUpdate = (realmID, values) => {
    dispatch(
      updateRealmByIdAction(realmID, {
        titleName: values.titleName,
        frontEndURL: values.frontEndURL,
        activated: values.activated
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
      titleName: record?.titleName ?? '',
      frontEndURL: record?.frontEndURL ?? '',
      activated: record?.activated ?? false
    };
  }, [record]);

  const formProps = useFormik({
    enableReinitialize: true, // for render data init when edit
    initialValues,
    validationSchema: validateCreateRealm(translate),
    onSubmit: (values) => handleUpdate(record.id, values)
  });

  return (
    <form onSubmit={formProps.handleSubmit}>
      <Card>
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
              disabled
              id="name"
              source="name"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.titleName"
              id="titleName"
              source="titleName"
              className={classes.input}
              {...formProps}
            />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.fields.frontEndURL"
              id="frontEndURL"
              source="frontEndURL"
              className={classes.input}
              {...formProps}
            />
            <ContactSupportCommon title="resources.configures.realms.fields.tooltip.frontEndURL" />
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SwitchInputBootStrap
              id="activated"
              source="activated"
              label="resources.configures.realms.fields.activated"
              {...formProps}
            />
            <ContactSupportCommon title="resources.configures.realms.fields.tooltip.activated" />
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

export default GeneralTab;
