/**
 * Request sent to update a user password.
 */
export default class UpdateUserPasswordRequestDTO {
  
    /**
     * @param oldPassword  The user's old password.
     * @param newPassword  The user's new password.
     */
    constructor(
      public readonly oldPassword: string,
      public readonly newPassword: string,
    ) {}
  
  }