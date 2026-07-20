import { PokemonCardData } from "../types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
    pokemonList: PokemonCardData[];
    loading: boolean;
    onResetFilters: () => void;
}

export function PokemonGrid({
    pokemonList,
    loading,
    onResetFilters,
}: PokemonGridProps) {
    if (!pokemonList.length && !loading) {
        return (
            <div className="no-results">
                <p>No Pokémon found matching these filters.</p>
                <button type="button" onClick={onResetFilters}>
                    Clear all filters
                </button>
            </div>
        );
    }

    return (
        <div className="pokemon-grid">
            {pokemonList.map((pokemon, index) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
            ))}
            {loading && Array.from({ length: 4 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="home-card skeleton-card">
                    <div className="skeleton-text" />
                </div>
            ))}
        </div>
    );
}