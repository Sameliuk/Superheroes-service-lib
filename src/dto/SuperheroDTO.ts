export interface SuperheroDTO {
    nickname: string
    real_name: string
    origin_description?: string | null
    superpowers: string
    catch_phrase: string
    images?: string[]
}
