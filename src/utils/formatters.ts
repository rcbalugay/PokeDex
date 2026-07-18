export function padId(id: number): string {
    return String(id).padStart(3, "0");
}

export function getImageUrl(id: number): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padId(id)}.png`;
}

export function formatHeight(decimeters: number): string {
    return `${(decimeters / 10).toFixed(1)}m`;
}

export function formatWeight(hectograms: number): string {
    return `${(hectograms / 10).toFixed(1)}kg`;
}