import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-nav">
        <NavLink to="/" className="nav-brand">Dasoasmi</NavLink>
      </div>
      <ul className="navbar-nav">
        {/* <li className="nav-item">
          <NavLink to="/add-shloka" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Add shloka</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink to="/view-shlokas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>View All</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;