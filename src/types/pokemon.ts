export interface PokemonTypeInfo {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStatInfo {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokeApiPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonTypeInfo[];
    stats: PokemonStatInfo[];
    abilities: Array<{
        ability: { name: string; url: string };
        is_hidden: boolean;
        slot: number;
    }>;
    sprites: {
        other?: {
            "official-artwork": {
                front_default?: string;
                front_shiny?: string;
            };
        };
    };
    species: {
        name: string;
        url: string;
    };
}

export interface PokeApiSpecies {
    id: number;
    name: string;
    gender_rate: number;
    evolution_chain?: {
        url: string;
    };
    genera: Array<{
        genus: string;
        language: { name: string };
    }>;
    flavor_text_entries: Array<{
        flavor_text: string;
        language: { name: string };
    }>;
    names: Array<{
        name: string;
        language: { name: string };
    }>;
    varieties?: Array<{
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        };
    }>;
    generation: {
        name: string;
    };
}

export interface PokemonVariety {
    id: number;
    name: string;
    isDefault: boolean;
}

export interface EvolutionStage {
    id: number;
    name: string;
    types: string[];
    imageUrl: string;
    depth?: number;
}

export interface AdjacentPokemon {
    id: number;
    name: string;
}

export interface PokemonCardData {
    id: number;
    name: string;
    japaneseName?: string;
    region?: string;
    types: string[];
    height: string;
    weight: string;
    desc: string;
    category: string;
    stats: number[];
    imageUrl: string;
    shinyImageUrl: string;
    abilities: string[];
    genderRate: number;
    weaknesses: string[];
    varieties: PokemonVariety[];
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}