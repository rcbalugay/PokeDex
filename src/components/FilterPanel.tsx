interface FilterPanelProps {
    activeTypes: string[];
    onToggleType: (type: string) => void;
    sort: string;
    onSortChange: (sort: string) => void;
    onReset: () => void;
}

const TYPE_OPTIONS = [
  'Grass',
  'Poison',
  'Fire',
  'Water',
  'Electric',
  'Normal',
  'Fairy',
  'Ghost',
  'Dark',
  'Bug',
  'Psychic',
  'Ground',
  'Dragon',
];

export function FilterPanel({
    activeTypes,
    onToggleType,
    sort,
    onSortChange,
    onReset,
}: FilterPanelProps) {
    return (
        <section className="browse-controls" aria-label="Pokémon filters">
            <div className="filter-group type-filter">
                <span className="filter-label">
                    Type <em>multi-select</em>
                </span>
                <div className="filter-chips">
                    {TYPE_OPTIONS.map((type) => {
                        const isSelected = activeTypes.includes(type);
                        const className = `type-${type.toLowerCase()} ${isSelected ? "selected" : ""}`;
                        return (
                            <button
                            key={type}
                            type="button"
                            onClick={() => onToggleType(type)}
                            className={className}
                            aria-pressed={isSelected}
                            >
                            {type}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="filter-group compact-filter">
                <label className="filter-label" htmlFor="sort">
                    Sort
                </label>
                <select
                id="sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                >
                <option value="number">Number (Ascending)</option>
                <option value="number-desc">Number (Descending)</option>
                <option value="name">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                </select>
            </div>

            <button className="clear-filters" type="button" onClick={onReset}>
                Reset
            </button>
        </section>
    );
}