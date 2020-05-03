import React from "react";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navitem">
        <h1>Pathfinder Visualizer</h1>
      </div>
      <div className="navitem">
        <h2>Algorithm</h2>
      </div>
      <div className="navitem">
        <button className="btn">
          <span>Visualize</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
