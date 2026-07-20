# Pokédex Web Application

A modern, responsive Pokédex web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It connects to the [PokéAPI](https://pokeapi.co/) to deliver detailed information, statistics, and evolution paths for Pokémon.

---

## Features

- 🔍 **Real-Time Search & Filtering**: Search Pokémon by name or ID (#0001 format), filter by elemental types, and sort by ID or alphabetical order.
- 📜 **Infinite Scrolling & Pagination**: Dynamically fetches and appends Pokémon data as you scroll down the main grid.
- 🎨 **Detailed Pokémon View**:
  - Full artwork view with **Normal** and **Shiny** variant toggles.
  - Complete **Evolution Chain Tree** with interactive nodes to jump to related Pokémon.
  - Base statistics bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).
  - Type effectiveness and weakness badges.
  - Flavor text stories, physical specs (height, weight, category, gender ratio), and abilities.
  - Next / Previous edge navigation.
- ⚡ **Animations & Micro-Interactions**:
  - Staggered card entrance animations.
  - CSS-animated Pokéball loading indicator.
  - Page entry/exit transitions.

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
