import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useSnackbar from "@hook/snackbar/useSnackbar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import {
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid/models/";
import ServerSideTable from "@component/ServerSideTable/ServerSideTable";
import { buildSearchParamsNullSafe } from "@utils/url-utils";
import {
  GridActionsCellItem,
  GridFilterModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import useApiMutation from "@hook/api/useApiMutation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateUserRequestDTO from "@api/dto/request/user/CreateUserRequestDTO";
import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";
import UserResponseDTO from "@api/dto/response/user/UserResponseDTO";
import CreateUserForm from "@component/AdminUser/CreateUserForm/CreateUserForm";
import UpdateUserForm from "@component/AdminUser/UpdateUserForm/UpdateUserForm";
import RoleDTO from "@api/dto/response/role/RoleDTO";

type UserSearchModel = {
  page: number;
  pageSize: number;
  minDate: string;
  maxDate: string;
  isUserAvailable: boolean | null;
  nameSort: number | null;
  creationDateSort: number | null;
  nameFilter: string | null;
};

export default function Users() {
  // Setup the fetch error snackbar
  const { snackbar: fetchErrorSnackbar, show: showFetchError } = useSnackbar(
    "Impossible de récupérer les utilisateurs.",
    "warning"
  );

  // Server side table configuration
  const [selectedUser, setSelectedUser] =
    useState<UserResponseDTO>({
      id: 0,
      login: "",
      roles: [],
    });
  const tableColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      type: "number",
      filterOperators: getGridStringOperators().filter(
        (o) => o.value === "equals"
      ),
    },
    {
      field: "login",
      headerName: "Adresse mail",
      flex: 1,
      type: "string",
      filterOperators: getGridStringOperators().filter(
        (o) => o.value === "contains"
      ),
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      type: "boolean",
      valueGetter: (params) => {
        // Obtenez la valeur des rôles de la ligne
        const roles: RoleDTO[] = params.row.roles;
        
        // Transformez les rôles en texte (ou toute autre représentation souhaitée)
        const rolesText = roles.map(role => role.name).join(', ');
  
        return rolesText;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.5,
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => {
            setSelectedUser({ id: params.id as number, ...params.row });
            setOpenUserUpdate(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => deleteUser(params.id as number)}
        />,
      ],
    },
  ];

  const initialSearchModel: UserSearchModel = {
    page: 0,
    pageSize: 10,
    minDate: dayjs("1970-01-01").toISOString(),
    maxDate: dayjs().add(1, "day").toISOString(),
    isUserAvailable: null,
    nameSort: null,
    creationDateSort: null,
    nameFilter: null,
  };
  const [searchModel, setSearchModel] = useState(initialSearchModel);

  const onSearchModelChange = (
    page: GridPaginationModel,
    sort: GridSortModel
  ) => {
    const nameSort = sort.filter((s) => s.field == "name")[0];
    const creationDateSort = sort.filter((s) => s.field == "creationDate")[0];
    const newSearchModel: UserSearchModel = {
      ...searchModel,
      page: page.page,
      pageSize: page.pageSize,
      nameSort:
        nameSort?.sort === undefined ? null : nameSort.sort === "desc" ? 0 : 1,
      creationDateSort:
        creationDateSort?.sort === undefined
          ? null
          : creationDateSort.sort === "desc"
          ? 0
          : 1,
    };
    if (JSON.stringify(newSearchModel) != JSON.stringify(searchModel)) {
      setSearchModel(newSearchModel);
    }
  };

  const onFilterModelChange = (filter: GridFilterModel) => {
    const nameFilter = filter.items.filter((f) => f.field == "name")[0];
    const availableFilter = filter.items.filter(
      (f) => f.field == "isAvailable"
    )[0];
    const newSearchModel: UserSearchModel = {
      ...searchModel,
      nameFilter: nameFilter?.value,
      isUserAvailable: availableFilter?.value,
    };
    if (JSON.stringify(newSearchModel) != JSON.stringify(searchModel)) {
      setSearchModel(newSearchModel);
    }
  };

  const onMinDateChange = (newValue: Dayjs | null) => {
    setSearchModel({
      ...searchModel,
      minDate: newValue?.toISOString() ?? initialSearchModel.minDate,
    });
  };

  const onMaxDateChange = (newValue: Dayjs | null) => {
    setSearchModel({
      ...searchModel,
      maxDate: newValue?.toISOString() ?? initialSearchModel.maxDate,
    });
  };

  // Send an API request to get the users
  const {
    data: users,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_USERS, undefined, {
    queryKey: JSON.stringify(searchModel),
    staleTime: -1,
    onError: showFetchError,
    searchParams: new URLSearchParams(
      buildSearchParamsNullSafe({
        page: `${searchModel.page}`,
        pageSize: `${searchModel.pageSize}`,
        nameSort: searchModel.nameSort,
        minDate: searchModel.minDate,
        maxDate: searchModel.maxDate,
        creationDateSort: searchModel.creationDateSort,
        nameFilter: searchModel.nameFilter,
        isUserAvailable: searchModel.isUserAvailable,
      })
    ),
  });

  // User creation handling
  const [openUserCreate, setOpenUserCreate] = useState(false);
  const { snackbar: creationErrorSnackbar, show: showCreationError } =
    useSnackbar("Impossible de créer le livreur.", "error");
  const {
    mutate: mutateCreation,
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    reset: resetCreationData,
  } = useApiMutation(APIEndpoint.CREATE_USER, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
  });
  const createUser = (user: CreateUserRequestDTO) => {
    // TODO regarder cette histoire de roleDTO
    // eslint-disable-next-line prefer-const
    let { login, password, roles } = user;
    const roleNames: string[] = roles.map(role => role.name);
    roles = roleNames; // Reassigning 'roles' with role names
    mutateCreation({ login, password, roles });
    setOpenUserCreate(false);
  };
  if (isCreationError) {
    showCreationError();
    resetCreationData();
  } else if (isCreationSuccess) {
    resetCreationData();
    refetch();
  }

  // User update handling
  const [openUserUpdate, setOpenUserUpdate] = useState(false);
  const { snackbar: updateErrorSnackbar, show: showUpdateError } = useSnackbar(
    "Impossible de modifier le livreur.",
    "error"
  );
  const {
    mutate: mutateUpdate,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    reset: resetUpdateData,
  } = useApiMutation(APIEndpoint.UPDATE_USER, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
  });
  const updateUser = (user: UpdateUserRequestDTO) => {
    const { newLogin } = user;
    mutateUpdate({ newLogin });
    setOpenUserUpdate(false);
  };
  if (isUpdateError) {
    showUpdateError();
    resetUpdateData();
  } else if (isUpdateSuccess) {
    resetUpdateData();
    refetch();
  }

  // Delete handling
  const { mutate: mutateDelete } = useApiMutation(
    APIEndpoint.DELETE_USER,
    null,
    false,
    {
      invalidateQueries: [JSON.stringify(searchModel)],
    }
  );
  const deleteUser = (id: number) => {
    mutateDelete({
        id: id,
    });
  };

  return (
    <>
      <Box sx={{ paddingLeft: "5%" }}>
        <h1>Utilisateurs</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "auto",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <DatePicker
              label="Date minimale"
              sx={{ margin: "10px 10px 10px 0" }}
              onChange={onMinDateChange}
            />
            <DatePicker
              label="Date maximale"
              sx={{ margin: "10px 10px 10px 0" }}
              onChange={onMaxDateChange}
            />
          </Box>
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={() => setOpenUserCreate(true)}
        >
          Créer un utilisateur
        </Button>
      </Box>
      <CenterDiv
        direction="column"
        sx={{ width: "90%", minHeight: "250px", margin: "auto" }}
      >
        <ServerSideTable
          idField="id"
          columns={tableColumns}
          rows={users != null ? users.elements : []}
          pageInfo={{
            maxElements: users != null ? users.maxElements : 0,
            page: searchModel.page,
            pageSize: searchModel.pageSize,
          }}
          loading={isLoading}
          onChange={onSearchModelChange}
          onFilter={onFilterModelChange}
        />
      </CenterDiv>
      {/* Creation modal */}
      <CenteredModal
        open={openUserCreate}
        handleClose={() => setOpenUserCreate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <CreateUserForm onSubmit={createUser} />
      </CenteredModal>
      {/* Edit user modal */}
      <CenteredModal
        open={openUserUpdate}
        handleClose={() => setOpenUserUpdate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <UpdateUserForm
          currentUser={selectedUser}
          onSubmit={updateUser}
        />
      </CenteredModal>
      {creationErrorSnackbar}
      {updateErrorSnackbar}
      {fetchErrorSnackbar}
    </>
  );
}
