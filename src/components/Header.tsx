import { Link } from "react-router";
import navLogo from "../imports/image-2.png";

interface HeaderProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onToggleFilter: () => void;
    filterOpen: boolean;
}

export function Header({
    searchValue,
    onSearchChange,
    onToggleFilter,
    filterOpen,
}: HeaderProps) {
    return (
        <header className="topbar">
            <Link to="/" className="mini-logo" aria-label="Go to the PokéDex">
            <img src={navLogo} alt="Pokédex Logo" />
            </Link>
            <div className="header-controls">
                <div className="header-search">
                    <label htmlFor="search-input" className="search-label">
                        Search the Pokémon by name or number
                    </label>
                    <div className="search-input-wrap">
                        <span className="search-icon" aria-hidden="true">⌕</span>
                        <input
                        id="search-input"
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder=""
                        aria-label="Search the Pokémon by name or number"
                        />
                    </div>
                </div>
                <button
                type="button"
                className={`filter-toggle-btn ${filterOpen ? "active" : ""}`}
                onClick={onToggleFilter}
                aria-label="Toggle filter panel"
                aria-expanded={filterOpen}
                >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
                </button>
            </div>
        </header>
    );
}