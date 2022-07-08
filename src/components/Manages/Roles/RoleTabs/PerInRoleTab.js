import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useTranslate,
  NotificationBootStrap,
  createIcon
} from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getPermissionsByRoleNameAction } from '@customActions/index';
import { NoRowsOverlayCommon } from '@components/Common';
import registerIcons from '@registerIcons';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  GRID_EN_LOCALE_TEXT,
  GRID_VN_LOCALE_TEXT
} from '@i18nProvider/localeTexts';
import { other } from '../roleUtils';

const useStyles = makeStyles({
  input: {
    width: 350
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important'
    }
  }
});

const PerInRoleTab = (props) => {
  const { navigate, roleName } = props;
  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getPermissionsByRoleNameAction(roleName, queryOptions));
  }, [dispatch, roleName, queryOptions]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'role.dataPermissionsInRole', []),
      total: get(state, 'role.totalPermissionsInRole', 0),
      loading: get(state, 'role.loadingPermissionsInRole', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/permission-edit/${id}`);
    },
    [navigate]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate(
          'resources.manages.roles.fields.permissions.name'
        ),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'description',
        headerName: translate(
          'resources.manages.roles.fields.permissions.description'
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

export default PerInRoleTab;
