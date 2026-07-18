import { useState } from "react";
import { Link } from "react-router";
import { PokemonCardData } from "../types/pokemon";
import { padId } from "../utils/formatters";

interface PokemonCardProps {
    pokemon: PokemonCardData;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const [imgError, setImgError] = useState(false);
    const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="home-card">
            <div>
                <div className="home-chip-row">
                    {pokemon.types.map((type) => (
                        <span key={type} className={`type-${type.toLowerCase()}`}>
                            {type}
                        </span>
                    ))}
                </div>
                <h2>{pokemon.name}</h2>
                <p>{pokemon.desc}</p>
                <button type="button" className="know-more-btn">
                    Know More
                </button>
            </div>
            <div className="card-number">#{padId(pokemon.id)}</div>
            <img
            src={imgError ? fallbackUrl : pokemon.imageUrl}
            alt={pokemon.name}
            onError={() => setImgError(true)}
            loading="lazy"
            />
        </Link>
    );
}