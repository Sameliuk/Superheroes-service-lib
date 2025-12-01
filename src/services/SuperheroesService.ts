import type { SuperheroesRepository } from "../interfaces/SuperheroesRepository.js"
import type { ImagesRepository } from "../interfaces/ImagesRepository.js"
import type { SuperheroDTO } from "../dto/SuperheroDTO.js"
import type { UpdateSuperheroDTO } from "../dto/UpdateSuperheroDTO.js"

export class SuperheroesService {
    constructor(
        private readonly superheroesRepository: SuperheroesRepository,
        private readonly imagesRepository: ImagesRepository
    ) {}

    async getAllSuperheroes(
        page = 1,
        limit = 5,
        userId?: number | null,
        searchQuery = ""
    ) {
        const params = {
            page,
            limit,
            searchQuery,
            ...(userId !== undefined && { userId }),
        }

        const { data, totalCount } = await this.superheroesRepository.findAll(
            params
        )

        return {
            page,
            totalPages: Math.ceil(totalCount / limit),
            data,
        }
    }

    async getSingleSuperhero(id: number) {
        return this.superheroesRepository.findById(id)
    }

    async createSuperhero(userId: number, data: SuperheroDTO) {
        const normalizedNickname = data.nickname
            .replace(/\s+/g, "")
            .toLowerCase()

        const existing =
            await this.superheroesRepository.findByNormalizedNickname(
                normalizedNickname
            )

        if (existing) {
            throw new Error("A superhero with this nickname already exists")
        }

        const hero = await this.superheroesRepository.create(userId, data)

        if (data.images?.length) {
            await this.imagesRepository.createImages(hero.id, data.images)
        }

        return this.superheroesRepository.findById(hero.id)
    }

    async updateSuperhero(
        userId: number,
        heroId: number,
        data: UpdateSuperheroDTO
    ) {
        const hero = await this.superheroesRepository.update(
            userId,
            heroId,
            data
        )

        if (!hero) return null

        if (data.removeImageIds?.length) {
            await this.imagesRepository.removeImages(data.removeImageIds)
        }

        if (data.newImages?.length) {
            await this.imagesRepository.createImages(heroId, data.newImages)
        }

        return this.superheroesRepository.findById(heroId)
    }

    async deleteSuperhero(userId: number, heroId: number): Promise<boolean> {
        return this.superheroesRepository.delete(userId, heroId)
    }
}
