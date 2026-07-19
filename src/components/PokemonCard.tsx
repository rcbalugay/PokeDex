import React, { useState } from "react";
import { Link } from "react-router";
import { PokemonCardData } from "../types/pokemon";
import { padId } from "../utils/formatters";

interface PokemonCardProps {
    pokemon: PokemonCardData;
}

const TYPE_COLORS: Record<string, string> = {
    Grass: '#7ab758',
    Poison: '#a467bd',
    Fire: '#e86b4b',
    Water: '#5aaec4',
    Electric: '#e7ba2c',
    Normal: '#a9a47f',
    Fairy: '#d987a3',
    Ghost: '#76529b',
    Dark: '#405054',
    Bug: '#92a212',
    Psychic: '#ea5d89',
    Ground: '#ceb256',
    Dragon: '#6751c9',
    Ice: '#72ceda',
    Steel: '#96a4b1',
    Rock: '#b6a136',
    Fighting: '#c85440',
    Flying: '#8094ee',
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const [imgError, setImgError] = useState(false);
    const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const primaryType = pokemon.types[0] || 'Normal';
    const cardColor = TYPE_COLORS[primaryType] || '#a9a47f';

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="v-card" style={{ '--card-bg': cardColor} as React.CSSProperties}>
            <div className="v-card-top">
                <span className="v-card-id">{padId(pokemon.id)}</span>
                <img
                    src={imgError ? fallbackUrl : pokemon.imageUrl}
                    alt={pokemon.name}
                    onError={() => setImgError(true)}
                    loading="lazy"
                />
            </div>
            <div className="v-card-bottom">
                <h2 className="v-card-title">{pokemon.name}</h2>
                <div className="v-card-types">
                    {pokemon.types.map((type) => (
                        <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}