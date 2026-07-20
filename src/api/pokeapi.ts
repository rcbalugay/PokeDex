import {
    AdjacentPokemon,
    EvolutionStage,
    PokeApiPokemon,
    PokeApiSpecies,
    PokemonCardData,
    PokemonListResponse,
} from "../types/pokemon";
import { capitalize, formatHeight, formatWeight, getImageUrl, getShinyImageUrl } from "../utils/formatters";
import { getWeaknesses } from "../utils/weaknesses";

const BASE_URL = "https://pokeapi.co/api/v2";

const GENERATION_TO_REGION: Record<string, string> = {
    "generation-i": "Kanto",
    "generation-ii": "Johto",
    "generation-iii": "Hoenn",
    "generation-iv": "Sinnoh",
    "generation-v": "Unova",
    "generation-vi": "Kalos",
    "generation-vii": "Alola",
    "generation-viii": "Galar",
    "generation-ix": "Paldea",
};

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
    const detail = await fetchPokemonDetail(idOrName);
    const speciesName = detail.species?.name || String(idOrName);
    const species = await fetchPokemonSpecies(speciesName).catch(() => null);

    const types = detail.types.map((t) => capitalize(t.type.name));
    const category = species?.genera.find((g) => g.language.name === "en")?.genus || "Pokemon";
    const englishEntries = species?.flavor_text_entries
        ? species.flavor_text_entries.filter((f) => f.language.name === "en")
        : [];
    const uniqueTexts: string[] = [];
    englishEntries.forEach((entry) => {
        const cleanText = entry.flavor_text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanText && !uniqueTexts.includes(cleanText)) {
            uniqueTexts.push(cleanText);
        }
    });
    const desc = uniqueTexts.slice(0, 3).join(' ') || "No description available.";
    const stats = detail.stats.map((s) => s.base_stat);
    const japaneseName = species?.names.find((n) => n.language.name === "ja-Hrkt")?.name ||
    species?.names.find((n) => n.language.name === "ja")?.name || "";
    const rawGen = species?.generation?.name || "generation-i";
    const region = GENERATION_TO_REGION[rawGen] || "Kanto";
    const abilities = detail.abilities ? detail.abilities.map((a) => capitalize(a.ability.name)) : [];
    const genderRate = species?.gender_rate ?? 1;

    const varieties = species?.varieties ? species.varieties.map((v) => {
        const vId = Number(v.pokemon.url.split("/").filter(Boolean).pop()) || 0;
        let vName = "Normal";
        if (!v.is_default) {
            const clean = v.pokemon.name.replace(new RegExp(`^${speciesName}-`, 'i'), '').replace(/-+/g, ' ');
            vName = clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        return {
            id: vId,
            name: vName,
            isDefault: v.is_default,
        };
    }) : [];

    return {
        id: detail.id,
        name: capitalize(detail.name),
        japaneseName,
        region,
        types,
        height: formatHeight(detail.height),
        weight: formatWeight(detail.weight),
        desc,
        category: category.replace(/ Pokémon$/i, ''),
        stats,
        imageUrl: getImageUrl(detail.id),
        shinyImageUrl: getShinyImageUrl(detail.id),
        abilities,
        genderRate,
        weaknesses: getWeaknesses(types),
        varieties,
    };
}

async function traverseChain(node: any, depth: number): Promise<EvolutionStage[]> {
    const urlParts = node.species.url.split("/").filter(Boolean);
    const speciesId = parseInt(urlParts[urlParts.length - 1], 10);
    const name = capitalize(node.species.name);

    let types = ["Normal"];
    try {
        const detail = await fetchPokemonDetail(speciesId);
        types = detail.types.map((t) => capitalize(t.type.name));
    } catch (err) {
        console.error(err);
    }

    const current: EvolutionStage = {
        id: speciesId,
        name,
        types,
        imageUrl: getImageUrl(speciesId),
        depth,
    };

    if (node.evolves_to && node.evolves_to.length > 0) {
        const childrenPromises = node.evolves_to.map((child: any) => traverseChain(child, depth + 1));
        const childrenResults = await Promise.all(childrenPromises);
        return [current, ...childrenResults.flat()];
    }

    return [current];
}

export async function fetchEvolutionChain(idOrName: string | number): Promise<EvolutionStage[]> {
    try {
        let speciesNameOrId = idOrName;
        if (typeof idOrName === "number" && idOrName >= 10000) {
            const detail = await fetchPokemonDetail(idOrName);
            speciesNameOrId = detail.species.name;
        } else if (typeof idOrName === "string" && !isNaN(Number(idOrName)) && Number(idOrName) >= 10000) {
            const detail = await fetchPokemonDetail(idOrName);
            speciesNameOrId = detail.species.name;
        }

        const species = await fetchPokemonSpecies(speciesNameOrId);
        if (!species.evolution_chain?.url) return [];
        const res = await fetch(species.evolution_chain.url);
        if (!res.ok) return [];
        const chainData = await res.json();

        return await traverseChain(chainData.chain, 0);
    } catch {
        return [];
    }
}

export async function fetchAdjacentPokemon(id: number): Promise<{ prev: AdjacentPokemon | null; next: AdjacentPokemon | null }> {
    let baseId = id;
    if (id >= 10000) {
        try {
            const detail = await fetchPokemonDetail(id);
            const speciesName = detail.species.name;
            const species = await fetchPokemonSpecies(speciesName);
            baseId = species.id;
        } catch {
            baseId = 1;
        }
    }

    const prevId = baseId > 1 ? baseId - 1 : null;
    const nextId = baseId < 1025 ? baseId + 1 : null;

    const [prev, next] = await Promise.all([
        prevId ? fetchPokemonDetail(prevId).then((d) => ({ id: d.id, name: capitalize(d.name) })).catch(() => null) : null,
        nextId ? fetchPokemonDetail(nextId).then((d) => ({ id: d.id, name: capitalize(d.name) })).catch(() => null) : null,
    ]);

    return { prev, next };
}
