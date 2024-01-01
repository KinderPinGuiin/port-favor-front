/**
 * Request sent to delete a user.
 */
export default class DeleteUserRequestDTO {
  
    /**
     * @param id    The user's id.
     */
    constructor(
        public readonly id:    number,
    ) {}
  
  }