import RoleDTO from "../role/RoleDTO";

/**
 * Login response data.
 */
export default class AuthenticationResponseDTO {

  /**
   * @param id    The user's id.
   * @param login The user's login.
   * @param roles The user's roles.
   * @param token The user's token.
   */
  constructor(
    public readonly id:    Int32Array,
    public readonly login: string,
    public readonly roles: RoleDTO[],
    public readonly token: string
  ) {}

}