import { Link } from "react-router";
import navLogo from "../imports/image-2.png";

export function Header() {
    return (
        <header className="topbar">
            <Link to="/" className="mini-logo" aria-label="Go to Pokédex Home">
            <img src={navLogo} alt="Pokédex Logo" />
            </Link>
        </header>
    );
}