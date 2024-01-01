/**
 * Request sent to update a user.
 */
export default class UpdateUserPasswordRequestDTO {
  
    /**
     * @param password  The user's new email.
     */
    constructor(
      public readonly newLogin: string,
    ) {}
  
  }