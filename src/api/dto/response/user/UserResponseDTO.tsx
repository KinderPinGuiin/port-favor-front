import RoleDTO from "../role/RoleDTO";

/**
 * Represents a user.
 */
export default class UserResponseDTO {

  /**
   * @param id    The user's id.
   * @param login The user's login.
   * @param roles The user's roles.
   */
  constructor(
    public readonly id:    Int32Array,
    public readonly login: string,
    public readonly roles: RoleDTO[],
  ) {}

}