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
    sprites: {
        other?: {
            "official-artwork": {
                front_default?: string;
            };
        };
    };
}

export interface PokeApiSpecies {
    id: number;
    name: string;
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
    generation: {
        name: string;
    };
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
    weaknesses: string[];
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