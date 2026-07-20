# Pokédex

A web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS** that pulls live data from [PokéAPI](https://pokeapi.co/). Browse the grid, inspect base stats and evolution chains, or search for any Pokémon.

---

## Features

- **Search & Filtering**: Search by name or Pokedex number (e.g., `#0001`), filter by elemental types, and sort by ID or name.
- **Infinite Scroll**: Loads more Pokémon automatically as you scroll down the page.
- **Detailed Pokémon Breakdown**:
  - Official artwork with toggles for Normal and Shiny forms.
  - Evolution trees with clickable nodes to navigate between stages.
  - Base stat bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).
  - Type weakness badges, abilities, gender ratios, height, weight, and flavor text descriptions.
  - Quick next/previous controls to navigate adjacent Pokémon.
- **Animations & Transitions**: Staggered card entrance effects, page transitions, and a custom CSS Pokéball loading spinner.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router v8](https://reactrouter.com/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS
- **API**: [PokéAPI REST API](https://pokeapi.co/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rcbalugay/PokeDex.git
   cd PokeDex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to view the app.

---

## 📜 Available Scripts

- `npm run dev` - Launches the Vite local development server.
- `npm run build` - Builds the application for production deployment to the `dist/` directory.
- `npm run preview` - Locally previews the production build.
- `npm run format` - Formats the codebase using `oxfmt`.

---

## 📁 Project Structure

```text
PokeDex/
├── src/
│   ├── api/          # PokéAPI fetch functions & data transformers
│   ├── components/   # UI components (PokemonCard, FilterPanel, Header, etc.)
│   ├── views/        # Main pages (HomeView, DetailView)
│   ├── types/        # TypeScript interfaces & type definitions
│   ├── utils/        # Formatters, helpers, & weakness calculators
│   ├── index.css     # Global styles & keyframe animations
│   ├── routes.tsx    # React Router routes definition
│   └── App.tsx       # Application root
├── package.json
└── vite.config.ts
```
