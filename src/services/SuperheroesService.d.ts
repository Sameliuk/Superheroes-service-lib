import type { SuperheroesRepository } from "../interfaces/SuperheroesRepository.js";
import type { ImagesRepository } from "../interfaces/ImagesRepository.js";
import type { SuperheroDTO } from "../dto/SuperheroDTO.js";
import type { UpdateSuperheroDTO } from "../dto/UpdateSuperheroDTO.js";
export declare class SuperheroesService {
    private readonly superheroesRepository;
    private readonly imagesRepository;
    constructor(superheroesRepository: SuperheroesRepository, imagesRepository: ImagesRepository);
    getAllSuperheroes(page?: number, limit?: number, userId?: number | null, searchQuery?: string): Promise<{
        page: number;
        totalPages: number;
        data: unknown[];
    }>;
    getSingleSuperhero(id: number): Promise<unknown>;
    createSuperhero(userId: number, data: SuperheroDTO): Promise<unknown>;
    updateSuperhero(userId: number, heroId: number, data: UpdateSuperheroDTO): Promise<unknown>;
    deleteSuperhero(userId: number, heroId: number): Promise<boolean>;
}
//# sourceMappingURL=SuperheroesService.d.ts.map