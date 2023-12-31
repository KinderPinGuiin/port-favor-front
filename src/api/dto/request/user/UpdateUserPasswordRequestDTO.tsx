/**
 * Request sent to update a user password.
 */
export default class UpdateUserPasswordRequestDTO {
  
    /**
     * @param password  The user's old password.
     * @param password  The user's new password.
     */
    constructor(
      public readonly oldPassword: string,
      public readonly newPassword: string,
    ) {}
  
  }