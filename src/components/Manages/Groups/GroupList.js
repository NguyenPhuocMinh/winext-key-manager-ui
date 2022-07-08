import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createIcon,
  useFormik,
  useTranslate,
  NotificationBootStrap,
  SearchInputBootStrap
} from 'story-bootstrap';
import { get, isEmpty } from 'lodash';
import {
  getAllGroupAction,
  resetGroupRecord,
  deleteGroupByIdAction,
  showPopup
} from '@customActions/index';
import {
  ButtonCreateCommon,
  NoRowsOverlayCommon,
  ShowPopupCommon
} from '@components/Common';
import { Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import registerIcons from '@registerIcons';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  GRID_EN_LOCALE_TEXT,
  GRID_VN_LOCALE_TEXT
} from '@i18nProvider/localeTexts';
import { other } from './GroupUtils';

const useStyles = makeStyles((_) => ({
  input: {
    width: 256
  },
  dataGridRoot: {
    '& .MuiIconButton-root': {
      border: 'none !important'
    }
  },
  search: {
    width: 300
  }
}));

const GroupList = (props) => {
  const { navigate } = props;

  // states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // hooks
  const classes = useStyles();
  const { translate, i18n } = useTranslate();

  const handleOnPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOnPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const dispatch = useDispatch();

  const initialValues = {
    search: ''
  };

  const formProps = useFormik({ initialValues });

  const queryOptions = useMemo(
    () => ({
      _start: page * pageSize,
      _end: page * pageSize + pageSize,
      search: formProps.values.search
    }),
    [page, pageSize, formProps.values.search]
  );

  useEffect(() => {
    dispatch(getAllGroupAction(queryOptions));
  }, [dispatch, queryOptions]);

  useEffect(() => {
    dispatch(resetGroupRecord());
  }, [dispatch]);

  const { data, total, loading } = useSelector((state) => {
    return {
      data: get(state, 'group.data', []),
      total: get(state, 'group.total', 0),
      loading: get(state, 'group.loading', false)
    };
  });

  const handleEdit = useCallback(
    (id) => () => {
      navigate(`/group-edit/${id}`);
    },
    [navigate]
  );

  const handleShowPopupDelete = useCallback(
    (id, name, realmName, query) => () => {
      dispatch(
        showPopup({
          open: true,
          title: 'resources.manages.groups.popup.title',
          content: 'resources.manages.groups.popup.content',
          onSubmit: () => dispatch(deleteGroupByIdAction(id, query)),
          options: {
            groupName: name,
            realmName
          }
        })
      );
    },
    [dispatch]
  );

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: translate('resources.manages.groups.fields.name'),
        flex: 0.5,
        resizable: false,
        filterable: false,
        sortable: false,
        valueFormatter: ({ value }) => (!isEmpty(value) ? value : '-')
      },
      {
        field: 'realmName',
        headerName: translate('resources.manages.groups.fields.realmName'),
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
              icon={createIcon({ icon: 'Delete', registerIcons })}
              onClick={handleShowPopupDelete(
                params.id,
                params.row.name,
                params.row.realmName,
                queryOptions
              )}
              label="Delete"
              key={params.id}
            />,
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
  }, [
    handleEdit,
    handleShowPopupDelete,
    queryOptions,
    translate,
    i18n.language
  ]);

  return (
    <Box display="block">
      <Box
        sx={{
          marginBottom: '1em',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <SearchInputBootStrap
          label="common.search"
          id="search"
          source="search"
          size="small"
          placeholder="resources.manages.groups.search"
          className={classes.search}
          {...formProps}
        />
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            flexWrap: 'wrap',
            justifyItems: 'center'
          }}
        >
          <Box width="auto" minWidth={50}>
            <ButtonCreateCommon
              label="common.button.create"
              redirect="/group-create"
            />
          </Box>
        </Box>
      </Box>
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
      <ShowPopupCommon />
      <NotificationBootStrap />
    </Box>
  );
};

export default GroupList;
