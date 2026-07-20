import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
    fetchAdjacentPokemon,
    fetchEvolutionChain,
    getPokemonCardData,
} from "../api/pokeapi";
import {
    AdjacentPokemon,
    EvolutionStage,
    PokemonCardData,
} from "../types/pokemon";
import { padId } from "../utils/formatters";
import navLogo from "../imports/image-2.png";

const STAT_NAMES = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Attack",
    "Sp. Defense",
    "Speed",
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
    const [evolutions, setEvolutions] = useState<EvolutionStage[]>([]);
    const [adjacent, setAdjacent] = useState<{ prev: AdjacentPokemon | null; next: AdjacentPokemon | null }>({ prev: null, next: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isShiny, setIsShiny] = useState(false);

    const currentId = id ? (isNaN(Number(id)) ? id : Number(id)) : 1;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        setIsShiny(false);

        getPokemonCardData(currentId)
            .then(async (data) => {
                if (!isMounted) return;
                setPokemon(data);

                const [evoChain, adj] = await Promise.all([
                    fetchEvolutionChain(data.id),
                    fetchAdjacentPokemon(data.id),
                ]);

                if (isMounted) {
                    setEvolutions(evoChain);
                    setAdjacent(adj);
                }
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

    if (loading) {
        return (
            <main className="v2-detail-page" style={{ display: 'grid', placeItems: 'center' }}>
                <div className="loading-container">
                    <div className="pokeball-loader" />
                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#666' }}>Catching Pokémon details...</p>
                </div>
            </main>
        );
    }

    if (error || !pokemon) {
        return (
            <main className="v2-detail-page" style={{ display: 'grid', placeItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px' }}>Pokémon Not Found</h1>
                    <Link to="/" style={{ color: '#ee794d', fontWeight: 800, textDecoration: 'none' }}>
                        Return to Pokédex
                    </Link>
                </div>
            </main>
        );
    }

    const primaryType = pokemon.types[0] || "Normal";
    const cardColor = TYPE_COLORS[primaryType] || "#ee794d";

    const customStyles = {
        '--type-color': cardColor,
    } as React.CSSProperties;

    return (
        <main className="v2-detail-page" style={customStyles}>
            {/* Top Navigation */}
            <header className="v2-topbar">
                <Link
                    to="/"
                    className="v2-back-btn"
                    aria-label="Back to Pokédex"
                >
                    <svg className="v2-back-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <img src={navLogo} alt="Pokédex Logo" className="v2-logo-img" />
                </Link>

                <div className="v2-top-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="v2-action-icon-btn"
                        aria-label="Search Pokédex"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="v2-action-icon-btn"
                        aria-label="Close detail view"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Detail Container */}
            <div className="v2-detail-card" key={pokemon.id}>
                {/* Background Pokeball Watermark */}
                <svg className="v2-pokeball-bg" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 A50 50 0 0 0 0 50 A50 50 0 0 0 50 100 A50 50 0 0 0 100 50 A50 50 0 0 0 50 0 Z M50 10 A40 40 0 0 1 89.6 45 L64.2 45 A15 15 0 0 0 35.8 45 L10.4 45 A40 40 0 0 1 50 10 Z M50 50 A10 10 0 1 1 50 50 Z M10.4 55 L35.8 55 A15 15 0 0 0 64.2 55 L89.6 55 A40 40 0 0 1 50 90 A40 40 0 0 1 10.4 55 Z" />
                </svg>

                {/* Edge Prev Arrow */}
                {adjacent.prev && (
                    <button
                        type="button"
                        className="v2-nav-edge v2-nav-prev"
                        onClick={() => navigate(`/pokemon/${adjacent.prev?.id}`)}
                        aria-label={`Previous Pokémon ${adjacent.prev.name}`}
                    >
                        <span className="v2-nav-arrow">‹</span>
                        <div className="v2-nav-label-stack">
                            <span className="v2-nav-id">#{padId(adjacent.prev.id)}</span>
                            <span className="v2-nav-name">{adjacent.prev.name}</span>
                        </div>
                    </button>
                )}

                {/* Edge Next Arrow */}
                {adjacent.next && (
                    <button
                        type="button"
                        className="v2-nav-edge v2-nav-next"
                        onClick={() => navigate(`/pokemon/${adjacent.next?.id}`)}
                        aria-label={`Next Pokémon ${adjacent.next.name}`}
                    >
                        <div className="v2-nav-label-stack">
                            <span className="v2-nav-id">#{padId(adjacent.next.id)}</span>
                            <span className="v2-nav-name">{adjacent.next.name}</span>
                        </div>
                        <span className="v2-nav-arrow">›</span>
                    </button>
                )}

                <div className="v2-detail-grid">
                    {/* Left Column */}
                    <div className="v2-left-col">
                        <div className="v2-header-info">
                            <h1 className="v2-title">
                                {pokemon.name} <span className="v2-id-num">#{padId(pokemon.id)}</span>
                            </h1>
                            <div className="v2-type-badges">
                                {pokemon.types.map((type) => (
                                    <span key={type} className={`v2-type-pill type-${type.toLowerCase()}`}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Visual Artwork */}
                        <div className="v2-artwork-wrapper">
                            <div
                                className="v2-artwork-glow"
                                style={{ background: `radial-gradient(circle, ${cardColor}40 0%, ${cardColor}00 70%)` }}
                            />
                            <img
                                src={isShiny ? (pokemon.shinyImageUrl || pokemon.imageUrl) : pokemon.imageUrl}
                                alt={pokemon.name}
                                className="v2-artwork-img"
                            />
                        </div>

                        {/* Evolution Chain */}
                        {evolutions.length > 0 && (() => {
                            const stagesMap: Record<number, typeof evolutions> = {};
                            evolutions.forEach((evo) => {
                                const d = evo.depth ?? 0;
                                if (!stagesMap[d]) stagesMap[d] = [];
                                stagesMap[d].push(evo);
                            });
                            const depths = Object.keys(stagesMap).map(Number).sort((a, b) => a - b);
                            return (
                                <div className="v2-evolutions-section">
                                    <h3 className="v2-section-title">Evolutions</h3>
                                    <div className="v2-evo-chain" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                        {depths.map((depth, idx) => {
                                            const stageList = stagesMap[depth];
                                            return (
                                                <React.Fragment key={depth}>
                                                    {idx > 0 && <div className="v2-evo-connector" style={{ flex: '0 0 auto', minWidth: '16px' }} />}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                                        {stageList.map((stage) => (
                                                            <div
                                                                key={stage.id}
                                                                className={`v2-evo-node ${stage.id === pokemon.id ? "active" : ""}`}
                                                                onClick={() => navigate(`/pokemon/${stage.id}`)}
                                                                role="button"
                                                                tabIndex={0}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter" || e.key === " ") navigate(`/pokemon/${stage.id}`);
                                                                }}
                                                            >
                                                                <div className="v2-evo-circle">
                                                                    <img src={stage.imageUrl} alt={stage.name} />
                                                                </div>
                                                                <span className="v2-evo-name">
                                                                    {stage.name} <span className="v2-evo-id">#{padId(stage.id)}</span>
                                                                </span>
                                                                <div className="v2-evo-types">
                                                                    {stage.types.map((t) => (
                                                                        <span key={t} className={`v2-type-pill-sm type-${t.toLowerCase()}`}>
                                                                            {t}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Right Column */}
                    <div className="v2-right-col">
                        <div className="v2-tab-content">
                            {/* Weaknesses */}
                            <div className="v2-info-group">
                                <h4 className="v2-sub-title">Weaknesses</h4>
                                <div className="v2-weakness-pills">
                                    {pokemon.weaknesses.map((w) => (
                                        <span key={w} className={`v2-type-pill type-${w.toLowerCase()}`}>
                                            {w}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Story */}
                            <div className="v2-info-group">
                                <h4 className="v2-sub-title">Story</h4>
                                <p className="v2-story-text">{pokemon.desc}</p>
                            </div>

                            {/* Variants & Forms */}
                            {pokemon.varieties && pokemon.varieties.length > 1 && (
                                <div className="v2-info-group">
                                    <h4 className="v2-sub-title">Forms</h4>
                                    <div className="v2-version-toggle" style={{ flexWrap: 'wrap', gap: '8px' }}>
                                        {pokemon.varieties.map((v) => (
                                            <button
                                                key={v.id}
                                                type="button"
                                                className={`v2-version-btn ${pokemon.id === v.id ? "active" : ""}`}
                                                onClick={() => navigate(`/pokemon/${v.id}`)}
                                            >
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="v2-info-group">
                                <h4 className="v2-sub-title">Artwork</h4>
                                <div className="v2-version-toggle">
                                    <button
                                        type="button"
                                        className={`v2-version-btn ${!isShiny ? "active" : ""}`}
                                        onClick={() => setIsShiny(false)}
                                    >
                                        Normal
                                    </button>
                                    <button
                                        type="button"
                                        className={`v2-version-btn ${isShiny ? "active" : ""}`}
                                        onClick={() => setIsShiny(true)}
                                    >
                                        Shiny
                                    </button>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="v2-specs-grid">
                                <div className="v2-spec-card">
                                    <span className="v2-spec-label">Height</span>
                                    <span className="v2-spec-val">{pokemon.height}</span>
                                </div>
                                <div className="v2-spec-card">
                                    <span className="v2-spec-label">Category</span>
                                    <span className="v2-spec-val">{pokemon.category}</span>
                                </div>
                                <div className="v2-spec-card">
                                    <span className="v2-spec-label">Gender</span>
                                    <span className="v2-spec-val v2-gender-val">
                                        <span className="v2-male-icon">♂</span>
                                        <span className="v2-female-icon">♀</span>
                                    </span>
                                </div>
                                <div className="v2-spec-card">
                                    <span className="v2-spec-label">Weight</span>
                                    <span className="v2-spec-val">{pokemon.weight}</span>
                                </div>
                                <div className="v2-spec-card" style={{ gridColumn: 'span 2' }}>
                                    <span className="v2-spec-label">Abilities</span>
                                    <span className="v2-spec-val">{pokemon.abilities.join(", ")}</span>
                                </div>
                            </div>

                            {/* Base Stats */}
                            <div className="v2-stats-group">
                                <h4 className="v2-sub-title">Stats</h4>
                                <div className="v2-stat-rows">
                                    {STAT_NAMES.map((statName, i) => {
                                        const val = pokemon.stats[i] ?? 0;
                                        const isHigh = val >= 50;
                                        return (
                                            <div key={statName} className="v2-stat-row">
                                                <span className="v2-stat-name">{statName}</span>
                                                <span className="v2-stat-num">{val}</span>
                                                <div className="v2-stat-bar-bg">
                                                    <div
                                                        className={`v2-stat-bar-fill ${isHigh ? "high" : "low"}`}
                                                        style={{ width: `${Math.min(100, (val / 150) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}