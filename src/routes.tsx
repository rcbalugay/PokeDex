import { createBrowserRouter, Link } from "react-router";
import { DetailView } from "./views/DetailView";
import { HomeView } from "./views/HomeView";

function NotFound() {
  return (
    <main className="not-found">
      <h1>Pokémon Not Found</h1>
      <Link to="/">Return to the Pokédex</Link>
    </main>
  );
}

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeView,
    },
    {
        path: "/pokemon/:id",
        Component: DetailView,
    },
    {
        path: "*",
        Component: NotFound,
    }
]);