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
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import CreateImageForm from "@component/CreateImageForm/CreateImageForm";
import UpdateImageForm from "@component/UpdateImageForm/UpdateImageForm";
import UpdateImageRequestDTO from "@api/dto/request/image/UpdateImageRequestDTO";
import CreateImageRequestDTO from "@api/dto/request/image/CreateImageRequestDTO";

type ImageSearchModel = {
  page: number;
  pageSize: number;
};

export default function Images() {
  // Setup the fetch error snackbar
  const { snackbar: fetchErrorSnackbar, show: showFetchError } = useSnackbar(
    "Impossible de récupérer les images.",
    "warning"
  );

  // Server side table configuration
  const [selectedImage, setSelectedImage] =
    useState<ImageResponseDTO>({
      id: 0,
      name: "",
      description: "",
      pub: true,
      mime: "",
      path: "",
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
      field: "name",
      headerName: "Nom",
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "pub",
      headerName: "Est publique",
      flex: 1,
      type: "boolean",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
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
            setSelectedImage({ id: params.id as number, ...params.row });
            setOpenImageUpdate(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => deleteImage(params.id as number)}
        />,
      ],
    },
  ];

  const initialSearchModel: ImageSearchModel = {
    page: 0,
    pageSize: 10,
  };
  const [searchModel, setSearchModel] = useState(initialSearchModel);

  const onSearchModelChange = (
    page: GridPaginationModel,
  ) => {
    const newSearchModel: ImageSearchModel = {
      ...searchModel,
      page: page.page,
      pageSize: page.pageSize,
    };
    if (JSON.stringify(newSearchModel) != JSON.stringify(searchModel)) {
      setSearchModel(newSearchModel);
    }
  };

  // Send an API request to get the images
  const {
    data: images,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_IMAGES_SKELETON, undefined, {
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

  // Image creation handling
  const [openImageCreate, setOpenImageCreate] = useState(false);
  const { snackbar: creationErrorSnackbar, show: showCreationError } =
    useSnackbar("Impossible de créer l'image.", "error");
  const {
    mutate: mutateCreation,
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    reset: resetCreationData,
  } = useApiMutation(APIEndpoint.CREATE_IMAGE, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
    formData: true,
  });
  const createImage = (image: CreateImageRequestDTO) => {
    const { name, description, isPublic, imageData } = image;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isPublic", isPublic.valueOf().toString());
    formData.append("imageData", imageData);
    mutateCreation(formData);
    setOpenImageCreate(false);
  };
  if (isCreationError) {
    showCreationError();
    resetCreationData();
  } else if (isCreationSuccess) {
    resetCreationData();
    refetch();
  }

  // Image update handling
  const [openImageUpdate, setOpenImageUpdate] = useState(false);
  const { snackbar: updateErrorSnackbar, show: showUpdateError } = useSnackbar(
    "Impossible de modifier l'image.",
    "error"
  );
  const {
    mutate: mutateUpdate,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    reset: resetUpdateData,
  } = useApiMutation(APIEndpoint.UPDATE_IMAGE, null, false, {
    invalidateQueries: [JSON.stringify(searchModel)],
  });
  const updateImageAdmin = (image: UpdateImageRequestDTO) => {
    const { id, name, description, isPublic } = image;
    mutateUpdate({ id, name, description, isPublic });
    setOpenImageUpdate(false);
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
    APIEndpoint.DELETE_IMAGE,
    null,
    false,
    {
      invalidateQueries: [JSON.stringify(searchModel)],
    }
  );
  const deleteImage = (id: number) => {
    mutateDelete({
        id: id,
    });
  };

  return (
    <>
      <Box sx={{ paddingLeft: "5%" }}>
        <h1>Images</h1>
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
          onClick={() => setOpenImageCreate(true)}
        >
          Créer une image
        </Button>
      </Box>
      <CenterDiv
        direction="column"
        sx={{ width: "90%", minHeight: "250px", margin: "auto" }}
      >
        <ServerSideTable
          idField="id"
          columns={tableColumns}
          rows={images != null ? images.elements : []}
          pageInfo={{
            maxElements: images != null ? images.maxElements : 0,
            page: searchModel.page,
            pageSize: searchModel.pageSize,
          }}
          loading={isLoading}
          onChange={onSearchModelChange}
        />
      </CenterDiv>
      {/* Creation modal */}
      <CenteredModal
        open={openImageCreate}
        handleClose={() => setOpenImageCreate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <CreateImageForm onSubmit={createImage} />
      </CenteredModal>
      {/* Edit image modal */}
      <CenteredModal
        open={openImageUpdate}
        handleClose={() => setOpenImageUpdate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <UpdateImageForm currentImage={selectedImage} onSubmit={updateImageAdmin} />
      </CenteredModal>
      {creationErrorSnackbar}
      {updateErrorSnackbar}
      {fetchErrorSnackbar}
    </>
  );
}
