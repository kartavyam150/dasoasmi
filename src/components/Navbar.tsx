import React from 'react';
import './Navbar.css'; // Assuming we'll create this CSS file

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-nav">
        <a href="/">Dasoasmi</a>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/add-shloka">Add shloka</a>
        </li>
        <li className="nav-item">
          <a href="/view-shlokas">View All</a>
        </li>
        <li className="nav-item">
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;