/**
 * Register request data.
 */
export default class RegistrationRequestDTO {
  
  /**
   * @param email    The new user's email.
   * @param password The new user's password.
   */
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

}