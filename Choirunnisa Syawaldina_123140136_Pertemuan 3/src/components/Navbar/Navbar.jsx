import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar glass-card">
      <Link to="/" className="nav-logo">MyBookApp</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/stats">Statistik</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;