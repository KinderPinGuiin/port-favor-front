/**
 * Request sent to update a user as an admin.
 */
export default class UpdateUserAdminRequestDTO {
  
    /**
     * @param id        The user's id.
     * @param email     The new user's email.
     * @param password  The new user's password.
     * @param newRoles     The new user's roles.
     */
    constructor(
      public readonly id:    number,
      public readonly email: string,
      public readonly password: string,
      public readonly roles: string[],
    ) {}
  
  }