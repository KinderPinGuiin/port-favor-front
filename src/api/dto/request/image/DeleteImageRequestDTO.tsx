/**
 * Request sent to delete an image.
 */
export default class DeleteImageRequestDTO {
    /**
     * @param id              The image's id.
     */
    constructor(
      public readonly id: number,
    ) {}
  }