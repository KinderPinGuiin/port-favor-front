import RoleDTO from "../role/RoleDTO";

/**
 * Register response data.
 */
export default class RegistrationResponseDTO {

  /**
   * @param email The new user's email.
   * @param token The new user's token.
   * @param roles The new user's roles.
   */
  constructor(
    public readonly email: string,
    public readonly token: string,
    public readonly roles: RoleDTO[],
  ) {}

}