import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getPokemonCardData } from "../api/pokeapi";
import { PokemonCardData } from "../types/pokemon";
import { padId } from "../utils/formatters";

const STAT_NAMES = [
    "HP",
    "ATTACK",
    "DEFENSE",
    "SP. ATTACK",
    "SP. DEFENSE",
    "SPEED",
];

export function DetailView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonCardData | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    
    const currentId = Number(id) || 1;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        getPokemonCardData(currentId)
            .then((data) => {
                if (isMounted) setPokemon(data);
            })
            .catch((err) => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, [currentId]);

    const prevId = currentId > 1 ? currentId - 1 : 1025;
    const nextId = currentId < 1025 ? currentId + 1 : 1;

    if (loading) {
        return (
            <main className="detail-page">
                <div className="detail-panel loading-panel">
                    <p>Loading Pokémon profile #{padId(currentId)}...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="detail-page">
            <div className="detail-panel">
                <div className="detail-nav">
                    <Link to="/" aria-label="Back to PokéDex Home">
                        ‹
                    </Link>
                    <button type="button" onClick={() => navigate(`/pokemon/${prevId}`)} aria-label="Previous Pokémon">
                        ← #{padId(prevId)}
                    </button>
                    <span className="current-id-badge">#{padId(pokemon.id)}</span>
                    <button type="button" onClick={() => navigate(`/pokemon/${nextId}`)} aria-label="Next Pokémon">
                        #{padId(nextId)} →
                    </button>
                </div>
                <div className="detail-main">
                    <div className="pokemon-info">
                        <p>#{padId(pokemon.id)}</p>
                        <h1>{pokemon.name}</h1>
                        <div className="measures">
                            Height: {pokemon.height}
                            <br />
                            Weight: {pokemon.weight}
                        </div>
                    </div>

                    <div className="pokemon-visual">
                        <div className="halo" />
                        <img src={pokemon.imageUrl} alt={pokemon.name} />
                    </div>
                    
                    <section className="stats">
                        <div className="detail-types">
                            {pokemon.types.map((t) => (
                                <span key={t} className={`type-${t.toLowerCase()}`}>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h2>Base stats:</h2>
                        <div className="stat-list">
                            {STAT_NAMES.map((statName, i) => (
                                <div key={statName}>
                                    <span>{statName}</span>
                                    <b>{pokemon.stats[i] ?? 0}</b>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <section className="detail-bio">
                    <div>
                        <p className="bio-kicker">Pokédex Bio</p>
                        <h2>About {pokemon.name}</h2>
                        <p>{pokemon.desc}</p>
                    </div>
                    <div className="facts">
                        <div>
                            <span>Category</span>
                            <b>{pokemon.category}</b>
                        </div>
                        <div>
                            <span>Weaknesses</span>
                            <div className="weakness-chips">
                            {pokemon.weaknesses.map((w) => (
                                <span key={w} className={`type-${w.toLowerCase()}`}>
                                    {w}
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="detail-footer">
                    <button type="button" onClick={() => navigate(`/pokemon/${prevId}`)}>
                        ← #{padId(prevId)}
                    </button>
                    <Link to="/">Back to Pokédex Home</Link>
                    <button type="button" onClick={() => navigate(`/pokemon/${nextId}`)}>
                        #{padId(nextId)} →
                    </button>
                </div>
            </div>
        </main>
    );
}