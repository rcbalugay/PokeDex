import React, { useEffect, useState } from "react";
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

const TYPE_COLORS: Record<string, string> = {
    Grass: '#77b957',
    Poison: '#a467bd',
    Fire: '#ee794d',
    Water: '#5ca9d1',
    Electric: '#e9bb32',
    Normal: '#a9a47f',
    Fairy: '#dc90ae',
    Ghost: '#715898',
    Dark: '#4d4744',
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

export function DetailView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonCardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchNameInput, setSearchNameInput] = useState("");
    const [searchNumInput, setSearchNumInput] = useState("");
    
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

    const handleSearchName = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchNameInput.trim()) {
            navigate(`/pokemon/${searchNameInput.trim().toLowerCase()}`);
            setSearchNameInput("");
        }
    };

    const handleSearchNum = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchNumInput.trim()) {
            navigate(`/pokemon/${searchNumInput.trim()}`);
            setSearchNumInput("");
        }
    };

    if (loading) {
        return (
            <main className="detail-page">
                <div className="detail-panel loading-panel">
                    <p>Loading Pokémon profile #{padId(currentId)}...</p>
                </div>
            </main>
        );
    }

    if (error || !pokemon) {
        return (
            <main className="not-found">
                <h1>Pokémon #{padId(currentId)} Not Found</h1>
                <Link to="/">Return to Pokédex</Link>
            </main>
        );
    }

    const primaryType = pokemon.types[0] || "Normal";
    const detailBg = TYPE_COLORS[primaryType] || "#7178a3";
    const rangeStart = Math.max(1, currentId - 4);
    const rangeEnd = Math.min(1025, rangeStart + 8);
    const navIds = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);

    return (
        <main className="detail-page">
            <div className="detail-panel" style={{ "--detail-bg": detailBg } as React.CSSProperties}>
                <div className="detail-nav">
                    <Link to="/" className="back-link" aria-label="Back to the PokéDex">
                        ‹
                    </Link>
                    <div className="nav-id-range">
                    <button type="button" onClick={() => navigate(`/pokemon/${Math.max(1, currentId - 1)}`)} aria-label="Previous Pokémon">
                        ←
                    </button>
                    {navIds.map((n) => (
                        <button key={n} type="button" className={n === currentId ? "active-id" : ""}
                        onClick={() => navigate(`/pokemon/${n}`)}>
                            {n}
                        </button>
                    ))}
                    <button type="button" onClick={() => navigate(`/pokemon/${Math.min(1025, currentId + 1)}`)} aria-label="Next Pokémon">
                        →
                    </button>
                </div>
            </div>
            <div className="detail-main">
                <div className="pokemon-info">
                    <p className="detail-id-badge">#{padId(pokemon.id)}</p>
                    <h1>{pokemon.name}</h1>
                    {pokemon.region && (
                        <span className="region-vertical">Región: {pokemon.region}</span>
                    )}
                    <div className="measures">
                        Height: {pokemon.height}
                        <br />
                        Weight: {pokemon.weight}
                    </div>
                </div>

                <div className="pokemon-visual">
                    {pokemon.japaneseName && (
                        <span className="jp-watermark">{pokemon.japaneseName}</span>
                    )}
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
                    <div className="stat-pills">
                        {STAT_NAMES.map((statName, i) => (
                            <div key={statName} className="stat-pill">
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

            <div className="detail-search-footer">
                <form onSubmit={handleSearchName} className="detail-search-form">
                    <input
                    type="text"
                    placeholder="Search pokemon by name"
                    value={searchNameInput}
                        onChange={(e) => setSearchNameInput(e.target.value)}
                        />
                        <button type="submit">Go!</button>
                    </form>
                    
                    <form onSubmit={handleSearchNum} className="detail-search-form">
                        <input
                        type="text"
                        placeholder="Search pokemon by ID"
                        value={searchNumInput}
                        onChange={(e) => setSearchNumInput(e.target.value)}
                        />
                        <button type="submit">Go!</button>
                    </form>
                    <Link to="/" className="detail-home-link">
                        Back to the Pokédex
                    </Link>
                </div>
            </div>
        </main>
    );
}