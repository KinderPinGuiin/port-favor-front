import RoleDTO from "@api/dto/response/role/RoleDTO";

/**
 * Request sent to update a user as an admin.
 */
export default class UpdateUserAdminRequestDTO {
  
    /**
     * @param id        The user's id.
     * @param newLogin     The new user's login.
     * @param newPassword  The new user's password.
     * @param newRoles     The new user's roles.
     */
    constructor(
      public readonly id:    Int32Array,
      public readonly newLogin: string,
      public readonly newPassword: string,
      public readonly newRoles: RoleDTO[],
    ) {}
  
  }