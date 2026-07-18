import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPokemonList, getPokemonCardData } from "../api/pokeapi";
import { FilterPanel } from "../components/FilterPanel";
import { Header } from "../components/Header";
import { PokemonGrid } from "../components/PokemonGrid";
import { SearchBar } from "../components/SearchBar";
import { LoadMoreButton } from "../components/LoadMoreButton";
import heroLogo from "../imports/image-3.png";
import { PokemonCardData } from "../types/pokemon";
import { padId } from "../utils/formatters";
import { PokemonCard } from "@/components/PokemonCard";

const PAGE_SIZE = 10;

export function HomeView() {
    const [pokemonList, setPokemonList] = useState<PokemonCardData[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTypes, setActiveTypes] = useState<string[]>([]);
    const [sort, setSort] = useState("number");

    const loadNextBatch = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const listRes = await fetchPokemonList(PAGE_SIZE, offset);
            if (!listRes.results.length) {
                setHasMore(false);
                return;
            }
            const cardDataPromises = listRes.results.map((item) => getPokemonCardData(item.name)
            );
            const newCards = await Promise.all(cardDataPromises);

            setPokemonList((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const filteredNew = newCards.filter((c) => !existingIds.has(c.id));
                return [...prev, ...filteredNew];
            });

            setOffset((prev) => prev + PAGE_SIZE);
            if (listRes.results.length < PAGE_SIZE) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Failed to load more Pokémon:", err);
        } finally {
            setLoading(false);
        }
    }, [offset, loading]);

    useEffect(() => {
        if (pokemonList.length === 0) {
            loadNextBatch();
        }
    }, [loadNextBatch, pokemonList.length]);

    const toggleType = (type: string) => {
        setActiveTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
    };
    
    const resetFilters = () => {
        setSearch("");
        setActiveTypes([]);
        setSort("number");
    };

    const visiblePokemon = useMemo(() => {
        const term = search.trim().toLowerCase();

        return pokemonList
        .filter((p) => {
            const matchesSearch = !term || p.name.toLowerCase().includes(term) ||
            String(p.id).includes(term) || padId(p.id).includes(term);

            const matchesTypes = !activeTypes.length || activeTypes.every((type) => p.types.includes(type));

            return matchesSearch && matchesTypes;
        })
        .sort((a, b) => {
            if (sort === "name") return a.name.localeCompare(b.name);
            if (sort === "name-desc") return b.name.localeCompare(a.name);
            if (sort === "number-desc") return b.id - a.id;
            return a.id - b.id
        });
    }, [pokemonList, search, activeTypes, sort]);

    return (
        <main className="home-shell">
            <Header />
            <section className="home-hero"></section>
        </main>
    )
} 