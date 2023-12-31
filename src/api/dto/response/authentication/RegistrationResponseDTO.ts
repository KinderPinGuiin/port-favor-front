import RoleDTO from "../role/RoleDTO";

/**
 * Register response data.
 */
export default class RegistrationResponseDTO {

  /**
   * @param login The new user's login.
   * @param token The new user's token.
   * @param roles The new user's roles.
   */
  constructor(
    public readonly login: string,
    public readonly token: string,
    public readonly roles: RoleDTO[],
  ) {}

}