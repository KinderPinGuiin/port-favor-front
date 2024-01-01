import { Class } from "@type/Class";
import AuthenticationRequestDTO from "@dto/request/authentication/AuthenticationRequestDTO";
import AuthenticationResponseDTO from "@dto/response/authentication/AuthenticationResponseDTO";
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";
import RegistrationResponseDTO from "@api/dto/response/authentication/RegistrationResponseDTO";
import UserResponseDTO from "@api/dto/response/user/UserResponseDTO";
import SearchResultResponseDTO from "@api/dto/search/SearchResultResponseDTO";
import CreateUserRequestDTO from "@api/dto/request/user/CreateUserRequestDTO";
import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";
import UpdateUserAdminRequestDTO from "@api/dto/request/user/UpdateUserAdminRequestDTO";
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import CreateImageRequestDTO from "@api/dto/request/image/CreateImageRequestDTO";
import UpdateImageRequestDTO from "@api/dto/request/image/UpdateImageRequestDTO";
import UpdateUserPasswordRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";

/**
 * Class containing the API endpoints metadata (URI, request type...). This class also contains all the existing API 
 * endpoints.
 * 
 * @param T The request type.
 * @param S The response type.
 */
export default class APIEndpoint<T, U> {

  public static readonly LOGIN = new APIEndpoint("/login", "POST", AuthenticationRequestDTO, AuthenticationResponseDTO);
  public static readonly REGISTER = new APIEndpoint("/register", "POST", RegistrationRequestDTO, RegistrationResponseDTO);
  public static readonly GET_USERS = new APIEndpoint("/user/get-all", "GET", null, SearchResultResponseDTO<UserResponseDTO>);
  public static readonly CREATE_USER = new APIEndpoint("/user/create", "POST", CreateUserRequestDTO, UserResponseDTO);
  public static readonly UPDATE_USER_ADMIN = new APIEndpoint("/user/update-admin", "POST", UpdateUserAdminRequestDTO, UserResponseDTO);
  public static readonly UPDATE_USER_EMAIL = new APIEndpoint("/user/update", "POST", UpdateUserRequestDTO, UserResponseDTO);
  public static readonly UPDATE_USER_PASSWORD = new APIEndpoint("/user/update-password", "POST", UpdateUserPasswordRequestDTO, UserResponseDTO);
  public static readonly DELETE_USER = new APIEndpoint("/user/delete", "DELETE", null, UserResponseDTO);

  public static readonly GET_IMAGES_SKELETON = new APIEndpoint("/image/get-skeleton", "GET", null, SearchResultResponseDTO<ImageResponseDTO>);
  public static readonly GET_IMAGE_SKELETON = new APIEndpoint("/image/get-skeleton/{name}", "GET", null, ImageResponseDTO);
  public static readonly GET_IMAGE_CONTENT = new APIEndpoint("/image/get/{name}", "GET", null, SearchResultResponseDTO<ImageResponseDTO>);
  public static readonly CREATE_IMAGE = new APIEndpoint("/image/create", "POST", FormData, ImageResponseDTO);
  public static readonly UPDATE_IMAGE = new APIEndpoint("/image/update", "POST", UpdateImageRequestDTO, ImageResponseDTO);
  public static readonly DELETE_IMAGE = new APIEndpoint("/image/delete", "DELETE", null, ImageResponseDTO);

  /**
   * @param uri          The endpoint's URI.
   * @param method       The request's method.
   * @param requestType  The request type.
   * @param responseType The response type.
   */
  constructor(
    public readonly uri: string,
    public readonly method: "GET" | "POST" | "PUT" | "DELETE",
    public readonly requestType: Class<T> | null,
    public readonly responseType: Class<U> | null,
  ) {}

  public toApiUrl(): string {
    return import.meta.env.VITE_API_HOST + this.uri;
  }

}
