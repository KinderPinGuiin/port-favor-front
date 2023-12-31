import RoleDTO from "@api/dto/response/role/RoleDTO";

/**
 * Request sent to create a user.
 */
export default class CreateUserRequestDTO {
  
    /**
     * @param login     The new user's login.
     * @param password  The new user's password.
     * @param roles     The new user's roles.
     */
    constructor(
      public readonly login: string,
      public readonly password: string,
      public readonly roles: RoleDTO[],
    ) {}
  
  }