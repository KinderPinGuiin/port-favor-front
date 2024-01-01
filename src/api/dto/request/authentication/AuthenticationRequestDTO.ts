/**
 * Login request data.
 */
export default class AuthenticationRequestDTO {
  
  /**
   * @param email    The user's email.
   * @param password The user's password.
   */
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

}