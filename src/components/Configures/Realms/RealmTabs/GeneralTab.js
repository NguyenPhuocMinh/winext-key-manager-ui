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
    dispatch(updateRealmByIdAction(realmID, { titleName: values.titleName }));
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
              label="resources.configures.realms.edit.fields.name"
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
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <TextInputBootStrap
              label="resources.configures.realms.edit.fields.titleName"
              id="titleName"
              source="titleName"
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
              label="resources.configures.realms.create.fields.activated"
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
            disabled={!formProps.isValid || !formProps.dirty}
          >
            {translate('resources.configures.realms.create.button_save')}
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
            {translate('resources.configures.realms.create.button_cancel')}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default GeneralTab;
