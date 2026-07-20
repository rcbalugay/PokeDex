export function padId(id: number): string {
    return String(id).padStart(3, "0");
}

export function getImageUrl(id: number): string {
    if (id >= 10000) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padId(id)}.png`;
}

export function getShinyImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
}

export function formatHeight(decimeters: number): string {
    return `${(decimeters / 10).toFixed(1)}m`;
}

export function formatWeight(hectograms: number): string {
    return `${(hectograms / 10).toFixed(1)}kg`;
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}