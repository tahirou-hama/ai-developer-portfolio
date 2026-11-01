import { Link } from  'react-router-dom';
import {useState } from 'react';

export  default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className= "navbar">
            <div className= "container navbar-content">
                <Link to="/"
                className="logo"
                onClick={closeMenu}
                >
                    TH<span>.</span>
                </Link>

                <nav className={menuOpen ? 'nav-menu active':'nav-menu'}>
                    <a href="#about" onClick={closeMenu}>
                        About
                    </a>

                    <a href="#skills" onClick={closeMenu}>
                        Skills
                    </a>

                    <a href="#education" onClick={closeMenu}>
                        Education
                    </a>

                    <a href="#projects" onClick={closeMenu}>
                        Projects
                    </a>

                    <a href="/#experience" onClick={closeMenu}>
                        Experience
                    </a>

                    <a href="#contact" onClick={closeMenu}>
                        Contact
                    </a>
                </nav>

                <Link to="/projects"
                className="nav-button"
                >
                    View Projects
                </Link>

                <button
                className="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                >
                    {menuOpen ? 'X':'☰'}
                </button>
            </div>
        </header>
    );
}