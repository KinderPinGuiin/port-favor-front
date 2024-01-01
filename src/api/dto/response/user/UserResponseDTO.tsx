import RoleDTO from "../role/RoleDTO";

/**
 * Represents a user.
 */
export default class UserResponseDTO {

  /**
   * @param id    The user's id.
   * @param email The user's email.
   * @param roles The user's roles.
   */
  constructor(
    public readonly id:    number,
    public readonly email: string,
    public readonly roles: RoleDTO[],
  ) {}

}