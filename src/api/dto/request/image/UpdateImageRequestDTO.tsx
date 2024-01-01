/**
 * Request sent to update an image.
 */
export default class UpdateImageRequestDTO {
    /**
     * @param id              The image's id.
     * @param name            The image's new name.
     * @param description     The image's new description.
     * @param isPublic        The image's new visability.
     */
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly description: string,
      public readonly isPublic: boolean,
    ) {}
  }