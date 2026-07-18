import {
    PokeApiPokemon,
    PokeApiSpecies,
    PokemonCardData,
    PokemonListResponse,
} from "../types/pokemon";
import { formatHeight, formatWeight, getImageUrl } from "../utils/formatters";
import { getWeaknesses } from "../utils/weaknesses";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
    limit = 10,
    offset = 0
): Promise<PokemonListResponse> {
    const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon list (Status ${response.status})`);
    }
    return response.json();
}

export async function fetchPokemonDetail(
    idOrName: string | number
): Promise<PokeApiPokemon> {
    const response = await fetch(
        `${BASE_URL}/pokemon/${String(idOrName).toLowerCase()}`
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch details for Pokemon "${idOrName}" (Status ${response.status})`
        );
    }
    return response.json();
}

export async function fetchPokemonSpecies(
    idOrName: string | number
): Promise<PokeApiSpecies> {
    const response = await fetch(
        `${BASE_URL}/pokemon-species/${String(idOrName).toLowerCase()}`
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch species data for "${idOrName}" (Status ${response.status})`
        );
    }
    return response.json();
}

export async function getPokemonCardData(
    idOrName: string | number
): Promise<PokemonCardData> {
    const [detail, species] = await Promise.all([
        fetchPokemonDetail(idOrName),
        fetchPokemonSpecies(idOrName).catch(() => null),
    ]);

    const types = detail.types.map(
        (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
    );

    const category = species?.genera.find((g) => g.language.name === "en")?.genus || "Pokemon";
    const rawBio = species?.flavor_text_entries.find((f) => f.language.name === "en")?.flavor_text || "No description available.";
    const desc = rawBio.replace(/[\n\f\r]/g, ' ');
    const stats = detail.stats.map((s) => s.base_stat);

    return {
        id: detail.id,
        name: detail.name.charAt(0).toUpperCase() + detail.name.slice(1),
        types,
        height: formatHeight(detail.height),
        weight: formatWeight(detail.weight),
        desc,
        category,
        stats,
        imageUrl: getImageUrl(detail.id),
        weaknesses: getWeaknesses(types),
    };
}
