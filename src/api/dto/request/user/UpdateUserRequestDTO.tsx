/**
 * Request sent to update a user.
 */
export default class UpdateUserPasswordRequestDTO {
  
    /**
     * @param password  The user's new login.
     */
    constructor(
      public readonly newLogin: string,
    ) {}
  
  }