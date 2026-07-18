interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-row">
            <div className="search-wrap">
                <input 
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by name or Pokédex number..."
                aria-label="Search by name or Pokédex number"
                />
                <span aria-hidden="true">⌕</span>
            </div>
            <button className="search-button" type="button" aria-label="Submit Search">
                ⌕
            </button>
        </div>
    );
}