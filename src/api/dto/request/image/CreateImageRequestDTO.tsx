/**
 * Request sent to create an image.
 */
export default class CreateImageRequestDTO {
    /**
     * @param name            The new image's name.
     * @param description     The new image's description.
     * @param isPublic        The new image's visability.
     * @param imageData       The new image's image datas.
     */
    constructor(
      public readonly name: string,
      public readonly description: string,
      public readonly isPublic: boolean,
      public readonly imageData: unknown,
    ) {}
  }