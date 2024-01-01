/**
 * Request sent to update a user.
 */
export default class UpdateUserPasswordRequestDTO {
  
    /**
     * @param newEmail  The user's new email.
     */
    constructor(
      public readonly newEmail: string,
    ) {}
  
  }