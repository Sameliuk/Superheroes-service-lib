export interface ImagesRepository {
    createImages(superheroId: number, urls: string[]): Promise<void>

    removeImages(imageIds: number[]): Promise<void>
}
