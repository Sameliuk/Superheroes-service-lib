export interface UpdateSuperheroDTO {
    nickname?: string;
    real_name?: string;
    origin_description?: string | null;
    superpowers?: string;
    catch_phrase?: string;
    newImages?: string[];
    removeImageIds?: number[];
}
