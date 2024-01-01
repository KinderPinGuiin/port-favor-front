import RoleDTO from "@api/dto/response/role/RoleDTO";

/**
 * Request sent to create a user.
 */
export default class CreateUserRequestDTO {
  
    /**
     * @param email     The new user's email.
     * @param password  The new user's password.
     * @param roles     The new user's roles.
     */
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly roles: RoleDTO[],
    ) {}
  
  }