/**
 * Image response data.
 */
export default class ImageResponseDTO {
    /**
     * @param id              The image's id.
     * @param name            The image's name.
     * @param description     The image's description.
     * @param pub             The image's visability.
     * @param mime            The image's mime.
     * @param path            The image's path.
     */
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly description: string,
      public readonly pub: boolean,
      public readonly mime: string,
      public readonly path: string,
    ) {}
  }