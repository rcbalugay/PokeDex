import { createBrowserRouter, Link, useNavigate, useParams } from 'react-router'
import { useMemo, useState } from 'react'
import navLogo from './imports/image-2.png'
import heroLogo from './imports/image-3.png'

const pokemon = [
  { id: 1, generation: 1, types: ['Grass', 'Poison'], color: '#7ab758', accent: '#d6e669', height: '0.7m', weight: '6.9kg', desc: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.', bio: 'Bulbasaur is a gentle, highly adaptable Pokémon. It stores sunlight in the seed on its back, giving it energy as it grows.', facts: [['Category', 'Seed Pokémon'], ['Ability', 'Overgrow'], ['Habitat', 'Grassland']], stats: [45, 49, 49, 65, 65, 45] },
  { id: 4, generation: 1, types: ['Fire'], color: '#e86b4b', accent: '#ffc165', height: '0.6m', weight: '8.5kg', desc: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.', bio: 'The flame at the tip of Charmander’s tail is a measure of its vitality. It burns more brightly when this Pokémon is healthy.', facts: [['Category', 'Lizard Pokémon'], ['Ability', 'Blaze'], ['Habitat', 'Mountain']], stats: [39, 52, 43, 60, 50, 65] },
  { id: 7, generation: 1, types: ['Water'], color: '#5aaec4', accent: '#b8e9ef', height: '0.5m', weight: '9.0kg', desc: 'After birth, its back swells and hardens into a shell. It powerfully sprays foam from its mouth.', bio: 'Squirtle’s shell is not just for protection. Its rounded shape and grooves help reduce resistance in water.', facts: [['Category', 'Tiny Turtle'], ['Ability', 'Torrent'], ['Habitat', 'Freshwater']], stats: [44, 48, 65, 50, 64, 43] },
  { id: 25, generation: 1, types: ['Electric'], color: '#e7ba2c', accent: '#ffea84', height: '0.4m', weight: '6.0kg', desc: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.', bio: 'Pikachu stores electricity in the pouches on its cheeks. It often releases a tiny discharge after waking up.', facts: [['Category', 'Mouse Pokémon'], ['Ability', 'Static'], ['Habitat', 'Forest']], stats: [35, 55, 40, 50, 50, 90] },
  { id: 39, generation: 1, types: ['Normal', 'Fairy'], color: '#d987a3', accent: '#ffd9e5', height: '0.5m', weight: '5.5kg', desc: 'When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.', bio: 'Jigglypuff has vocal cords that freely adjust the wavelength of its voice, creating a perfectly soothing lullaby.', facts: [['Category', 'Balloon Pokémon'], ['Ability', 'Cute Charm'], ['Habitat', 'Grassland']], stats: [115, 45, 20, 45, 25, 20] },
  { id: 94, generation: 1, types: ['Ghost', 'Poison'], color: '#76529b', accent: '#d69adf', height: '1.5m', weight: '40.5kg', desc: 'On the night of a full moon, if shadows move on their own and laugh, it must be Gengar’s doing.', bio: 'Gengar hides in shadows and mimics them perfectly. Its mischievous grin appears just before it plays a prank.', facts: [['Category', 'Shadow Pokémon'], ['Ability', 'Cursed Body'], ['Habitat', 'Cave']], stats: [60, 65, 60, 130, 75, 110] },
  { id: 133, generation: 1, types: ['Normal'], color: '#a97050', accent: '#e9c281', height: '0.3m', weight: '6.5kg', desc: 'Its ability to evolve into many forms allows it to adapt smoothly and perfectly to any environment.', bio: 'Eevee’s irregular genetic code lets it evolve into many different forms, depending on where and how it lives.', facts: [['Category', 'Evolution Pokémon'], ['Ability', 'Run Away'], ['Habitat', 'Urban']], stats: [55, 55, 50, 45, 65, 55] },
  { id: 197, generation: 2, types: ['Dark'], color: '#405054', accent: '#e1c84e', height: '1.0m', weight: '27.0kg', desc: 'When exposed to the moon’s aura, the rings on its body glow and it quietly awaits its prey.', bio: 'Umbreon evolved from exposure to moonlight. Its rings glow at night, intimidating opponents before it makes a move.', facts: [['Category', 'Moonlight Pokémon'], ['Ability', 'Synchronize'], ['Habitat', 'Urban']], stats: [95, 65, 110, 60, 130, 65] },
]

const typeClass = (type: string) => `type-${type.toLowerCase().replace(' ', '-')}`
const title = () => <img className="hero-logo" src={heroLogo} alt="Pokédex" />
const image = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
const pad = (n: number) => String(n).padStart(3, '0')

function Home() {
  const [search, setSearch] = useState('')
  const [activeTypes, setActiveTypes] = useState<string[]>([])
  const [generation, setGeneration] = useState('All')
  const [sort, setSort] = useState('number')
  const typeOptions = ['Grass', 'Poison', 'Fire', 'Water', 'Electric', 'Normal', 'Fairy', 'Ghost', 'Dark']
  const visible = useMemo(() => pokemon.filter(p => {
    const term = search.trim().toLowerCase()
    const matchesSearch = !term || p.name.toLowerCase().includes(term) || String(p.id).includes(term) || pad(p.id).includes(term)
    const matchesTypes = !activeTypes.length || activeTypes.every(type => p.types.includes(type))
    const matchesGeneration = generation === 'All' || p.generation === Number(generation)
    return matchesSearch && matchesTypes && matchesGeneration
  }).sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : sort === 'bst' ? b.stats.reduce((sum, stat) => sum + stat, 0) - a.stats.reduce((sum, stat) => sum + stat, 0) : a.id - b.id), [search, activeTypes, generation, sort])
  const toggleType = (type: string) => setActiveTypes(current => current.includes(type) ? current.filter(item => item !== type) : [...current, type])
  const resetFilters = () => { setSearch(''); setActiveTypes([]); setGeneration('All'); setSort('number') }
  return <main className="home-shell">
    <header className="topbar"><Link to="/" className="mini-logo"><img src={navLogo} alt="Pokédex" /></Link><button className="menu-button" aria-label="Open menu">≡</button></header>
    <section className="home-hero"><div className="hero-ball ball-left"/><div className="hero-ball ball-right"/>{title()}</section>
    <section className="home-content">
      <div className="search-row"><div className="search-wrap"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or Pokédex number..." aria-label="Search by name or Pokédex number"/><span>⌕</span></div><button className="search-button" aria-label="Search">⌕</button></div>
      <section className="browse-controls" aria-label="Pokémon filters"><div className="filter-group type-filter"><span className="filter-label">Type <em>multi-select</em></span><div className="filter-chips">{typeOptions.map(type => <button key={type} onClick={() => toggleType(type)} className={`${typeClass(type)} ${activeTypes.includes(type) ? 'selected' : ''}`}>{type}</button>)}</div></div><div className="filter-group compact-filter"><label className="filter-label" htmlFor="generation">Generation</label><select id="generation" value={generation} onChange={e => setGeneration(e.target.value)}><option value="All">All generations</option><option value="1">Generation I</option><option value="2">Generation II</option></select></div><div className="filter-group compact-filter"><label className="filter-label" htmlFor="sort">Sort</label><select id="sort" value={sort} onChange={e => setSort(e.target.value)}><option value="number">Number</option><option value="name">Name</option><option value="bst">Highest BST</option></select></div><button className="clear-filters" onClick={resetFilters}>Reset</button></section>
      <div className="results-summary"><span>{visible.length} Pokémon found</span><span>{activeTypes.length ? `Types: ${activeTypes.join(' + ')}` : 'All types'}</span></div>
      <div className="pokemon-grid">{visible.map(p => <Link to={`/pokemon/${p.id}`} key={p.id} className="home-card" style={{ '--card': p.color } as React.CSSProperties}><div><div className="home-chip-row">{p.types.map(t => <span key={t} className={typeClass(t)}>{t}</span>)}</div><h2>{p.name}</h2><p>{p.desc}</p><b>Know More</b></div><div className="card-number">#{pad(p.id)}</div><img src={image(p.id)} alt={p.name}/></Link>)}</div>
      {!visible.length && <div className="no-results"><p>No Pokémon found with these filters.</p><button onClick={resetFilters}>Clear all filters</button></div>}
    </section>
  </main>
}

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const index = pokemon.findIndex(p => p.id === Number(id))
  const current = pokemon[index] ?? pokemon[0]
  const statNames = ['HP', 'ATTACK', 'DEFENSE', 'SP. ATTACK', 'SP. DEFENSE', 'SPEED']
  const prev = pokemon[(index - 1 + pokemon.length) % pokemon.length]
  const next = pokemon[(index + 1) % pokemon.length]
  return <main className="detail-page" style={{ '--detail': current.color, '--accent': current.accent } as React.CSSProperties}>
    <div className="detail-panel">
      <div className="detail-nav"><Link to="/" aria-label="Back to Pokédex">‹</Link><div>{pokemon.map(p => <button key={p.id} className={p.id === current.id ? 'current' : ''} onClick={() => navigate(`/pokemon/${p.id}`)}>{p.id}</button>)}</div><button onClick={() => navigate(`/pokemon/${next.id}`)} aria-label="Next Pokémon">›</button></div>
      <div className="detail-main"><div className="pokemon-info"><p>#{pad(current.id)}</p><h1>{current.name}</h1><div className="foreign-name">{current.name === 'Gengar' ? 'ゲンガー' : current.name === 'Umbreon' ? 'ブラッキー' : current.name === 'Pikachu' ? 'ピカチュウ' : 'ポケットモンスター'}</div><div className="region">Region: Kanto</div><div className="measures">Height: {current.height}<br/>Weight: {current.weight}</div></div><div className="pokemon-visual"><div className="halo"/><img src={image(current.id)} alt={current.name}/></div><section className="stats"><div className="detail-types">{current.types.map(t => <span key={t} className={typeClass(t)}>{t}</span>)}</div><h2>Base stats:</h2><div className="stat-list">{statNames.map((stat, i) => <div key={stat}><span>{stat}</span><b>{current.stats[i]}</b></div>)}</div></section></div><section className="detail-bio"><div><p className="bio-kicker">Pokédex bio</p><h2>About {current.name}</h2><p>{current.bio}</p></div><div className="facts">{current.facts.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div></section>
      <div className="detail-footer"><button onClick={() => navigate(`/pokemon/${prev.id}`)}>← #{pad(prev.id)} {prev.name}</button><Link to="/">Back to archive</Link><button onClick={() => navigate(`/pokemon/${next.id}`)}>{next.name} #{pad(next.id)} →</button></div>
    </div>
  </main>
}

function NotFound() { return <main className="not-found"><h1>Pokémon not found</h1><Link to="/">Return to Pokédex</Link></main> }
export const router = createBrowserRouter([{ path: '/', Component: Home }, { path: '/pokemon/:id', Component: Details }, { path: '*', Component: NotFound }])
