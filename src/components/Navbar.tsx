import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-nav">
        <Link to="/">Dasoasmi</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/add-shloka">Add shloka</Link>
        </li>
        <li className="nav-item">
          <Link to="/view-shlokas">View All</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
