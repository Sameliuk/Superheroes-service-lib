export class SuperheroesService {
    constructor(superheroesRepository, imagesRepository) {
        this.superheroesRepository = superheroesRepository;
        this.imagesRepository = imagesRepository;
    }
    async getAllSuperheroes(page = 1, limit = 5, userId, searchQuery = "") {
        const params = {
            page,
            limit,
            searchQuery,
            ...(userId !== undefined && { userId }),
        };
        const { data, totalCount } = await this.superheroesRepository.findAll(params);
        return {
            page,
            totalPages: Math.ceil(totalCount / limit),
            data,
        };
    }
    async getSingleSuperhero(id) {
        return this.superheroesRepository.findById(id);
    }
    async createSuperhero(userId, data) {
        const normalizedNickname = data.nickname
            .replace(/\s+/g, "")
            .toLowerCase();
        const existing = await this.superheroesRepository.findByNormalizedNickname(normalizedNickname);
        if (existing) {
            throw new Error("A superhero with this nickname already exists");
        }
        const hero = await this.superheroesRepository.create(userId, data);
        if (data.images?.length) {
            await this.imagesRepository.createImages(hero.id, data.images);
        }
        return this.superheroesRepository.findById(hero.id);
    }
    async updateSuperhero(userId, heroId, data) {
        const { newImages, removeImageIds, ...heroData } = data;
        const hero = await this.superheroesRepository.update(userId, heroId, heroData);
        if (!hero)
            return null;
        if (removeImageIds?.length) {
            await this.imagesRepository.removeImages(removeImageIds);
        }
        if (newImages?.length) {
            await this.imagesRepository.createImages(heroId, newImages);
        }
        return this.superheroesRepository.findById(heroId);
    }
    async deleteSuperhero(userId, heroId) {
        return this.superheroesRepository.delete(userId, heroId);
    }
}
