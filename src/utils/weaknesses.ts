const TYPE_WEAKNESS_MAP: Record<string, string[]> = {
    normal: ["fighting"],
    fire: ["water", "ground", "rock"],
    water: ['electric', 'grass'],
    electric: ['ground'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    fighting: ['flying', 'psychic', 'fairy'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'grass', 'ice'],
    flying: ['electric', 'ice', 'rock'],
    psychic: ['bug', 'ghost', 'dark'],
    bug: ['fire', 'flying', 'rock'],
    rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
    ghost: ['ghost', 'dark'],
    dragon: ['ice', 'dragon', 'fairy'],
    steel: ['fire', 'fighting', 'ground'],
    fairy: ['poison', 'steel'],
    dark: ['fighting', 'bug', 'fairy'],
};

export function getWeaknesses(types: string[]): string[] {
    const weaknessSet = new Set<string>();

    types.forEach((type) => {
        const normalizedType = type.toLowerCase();
        const weaknesses = TYPE_WEAKNESS_MAP[normalizedType] || [];
        weaknesses.forEach((w) => {
            const formatted = w.charAt(0).toUpperCase() + w.slice(1);
            weaknessSet.add(formatted);
        });
    });

    return Array.from(weaknessSet);
}