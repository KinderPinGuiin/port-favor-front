// import RoleDTO from "../role/RoleDTO";

/**
 * Login response data.
 */
export default class AuthenticationResponseDTO {

  /**
   * @param login The user's login.
   * @param token The user's token.
   * @param roles The user's roles.
   */
  constructor(
    // public readonly login: string,
    public readonly token: string,
    // public readonly roles: RoleDTO[],
  ) {}

}