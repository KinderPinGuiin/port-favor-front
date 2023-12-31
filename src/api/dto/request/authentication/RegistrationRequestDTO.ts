/**
 * Register request data.
 */
export default class RegistrationRequestDTO {
  
  /**
   * @param login    The new user's login.
   * @param password The new user's password.
   */
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}

}