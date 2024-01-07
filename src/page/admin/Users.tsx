import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useSnackbar from "@hook/snackbar/useSnackbar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import {
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid/models/";
import ServerSideTable from "@component/ServerSideTable/ServerSideTable";
import { buildSearchParamsNullSafe } from "@utils/url-utils";
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import useApiMutation from "@hook/api/useApiMutation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateUserRequestDTO from "@api/dto/request/user/CreateUserRequestDTO";
import UpdateUserAdminRequestDTO from "@api/dto/request/user/UpdateUserAdminRequestDTO";
import UserResponseDTO from "@api/dto/response/user/UserResponseDTO";
import CreateUserForm from "@component/CreateUserForm/CreateUserForm";
import RoleDTO from "@api/dto/response/role/RoleDTO";
import UpdateUserAdminForm from "@component/UpdateUserAdminForm/UpdateUserAdminForm";

type UserSearchModel = {
  page: number;
  pageSize: number;
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
      email: "",
      roles: [],
    });
  const tableColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Adresse mail",
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      valueGetter: (params) => {
        const roles: RoleDTO[] = params.row.roles;
        if (!roles || !Array.isArray(roles)) {
          return '';
        }
        const rolesText = roles.map(role => role.name).join(', ');
        return rolesText;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      sortable: false,
      filterable: false,
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
  };
  const [searchModel, setSearchModel] = useState(initialSearchModel);

  const onSearchModelChange = (
    page: GridPaginationModel,
  ) => {
    const newSearchModel: UserSearchModel = {
      ...searchModel,
      page: page.page,
      pageSize: page.pageSize,
    };
    if (JSON.stringify(newSearchModel) != JSON.stringify(searchModel)) {
      setSearchModel(newSearchModel);
    }
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
      })
    ),
  });

  // User creation handling
  const [openUserCreate, setOpenUserCreate] = useState(false);
  const { snackbar: creationErrorSnackbar, show: showCreationError } =
    useSnackbar("Impossible de créer l'utilisateur.", "error");
  const {
    mutate: mutateCreation,
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    reset: resetCreationData,
  } = useApiMutation(APIEndpoint.CREATE_USER, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
  });
  const createUser = (user: CreateUserRequestDTO) => {
    const { email, password, roles } = user;
    mutateCreation({ email, password, roles });
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
    "Impossible de modifier l'utilisateur.",
    "error"
  );
  const {
    mutate: mutateUpdate,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    reset: resetUpdateData,
  } = useApiMutation(APIEndpoint.UPDATE_USER_ADMIN, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
  });
  const updateUserAdmin = (user: UpdateUserAdminRequestDTO) => {
    const { id, email, password, roles } = user;
    mutateUpdate({ id, email, password, roles });
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
        <UpdateUserAdminForm currentUser={selectedUser} onSubmit={updateUserAdmin} />
      </CenteredModal>
      {creationErrorSnackbar}
      {updateErrorSnackbar}
      {fetchErrorSnackbar}
    </>
  );
}
