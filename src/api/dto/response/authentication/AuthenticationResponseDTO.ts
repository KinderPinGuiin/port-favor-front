import RoleDTO from "../role/RoleDTO";

/**
 * Login response data.
 */
export default class AuthenticationResponseDTO {

  /**
   * @param id    The user's id.
   * @param email The user's email.
   * @param roles The user's roles.
   * @param token The user's token.
   */
  constructor(
    public readonly id:    Int32Array,
    public readonly email: string,
    public readonly roles: RoleDTO[],
    public readonly token: string
  ) {}

}