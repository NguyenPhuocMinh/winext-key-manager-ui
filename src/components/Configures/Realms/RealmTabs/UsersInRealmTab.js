import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  createIcon
} from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getUsersByRealmNameAction } from '@customActions/index';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { NoRowsOverlayCommon } from '@components/Common';
import {
  GRID_EN_LOCALE_TEXT,
  GRID_VN_LOCALE_TEXT
} from '@i18nProvider/localeTexts';
import registerIcons from '@registerIcons';
import { other } from '../RealmUtils';

const useStyles = makeStyles({
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important'
    }
  }
});

const UsersInRealmTab = (props) => {
  const { navigate, realmName } = props;
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();

  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize
    }),
    [page, pageSize]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRealmNameAction(realmName, queryOptions));
  }, [dispatch, realmName, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'realm.dataUsersInRealm', []),
      total: get(state, 'realm.totalUsersInRealm', 0),
      loading: get(state, 'realm.loadingUsersInRealm', false)
    };
  });

  const handleEdit = useCallback(
    (userID) => () => {
      navigate(`/user-edit/${userID}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'userName',
        headerName: translate(
          'resources.configures.realms.fields.users.userName'
        ),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'firstName',
        headerName: translate(
          'resources.configures.realms.fields.users.firstName'
        ),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'lastName',
        headerName: translate(
          'resources.configures.realms.fields.users.lastName'
        ),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'email',
        headerName: translate('resources.configures.realms.fields.users.email'),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'activated',
        type: 'boolean',
        headerName: translate(
          'resources.configures.realms.fields.users.activated'
        ),
        flex: 1,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: translate('actions.title'),
        flex: 0.5,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={createIcon({ icon: 'Edit', registerIcons })}
              onClick={handleEdit(params.id)}
              label="Edit"
              key={params.id}
            />
          ];
        }
      }
    ];
  }, [handleEdit, queryOptions, translate, i18n.language]);

  return (
    <Box sx={{ minWidth: 400 }}>
      <Paper elevation={3}>
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={
              i18n.language === 'en' ? GRID_EN_LOCALE_TEXT : GRID_VN_LOCALE_TEXT
            }
            loading={loading}
            rows={data}
            rowCount={total}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPageChange={handleOnPageChange}
            onPageSizeChange={handleOnPageSizeChange}
            rowsPerPageOptions={[5, 10, 20, 100]}
            pagination
            paginationMode="server"
            disableColumnMenu
            components={{
              NoRowsOverlay: NoRowsOverlayCommon
            }}
            classes={{
              root: classes.dataGridRoot
            }}
            {...other}
          />
        </Box>
      </Paper>
      <NotificationBootStrap />
    </Box>
  );
};

export default UsersInRealmTab;
