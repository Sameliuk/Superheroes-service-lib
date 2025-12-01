import type { SuperheroDTO } from "../dto/SuperheroDTO.js"

export interface SuperheroesRepository {
    findAll(params: {
        page: number
        limit: number
        userId?: number | null
        searchQuery?: string
    }): Promise<{
        data: unknown[]
        totalCount: number
    }>

    findById(id: number): Promise<unknown | null>

    findByNormalizedNickname(
        normalizedNickname: string
    ): Promise<unknown | null>

    create(userId: number, data: SuperheroDTO): Promise<{ id: number }>

    update(
        userId: number,
        heroId: number,
        data: Partial<SuperheroDTO>
    ): Promise<unknown | null>

    delete(userId: number, heroId: number): Promise<boolean>
}
