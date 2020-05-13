import React from "react";
import dijkstraAlgo from "../algorithms/dijkstra";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <div className="nav1">
      <div className="navbar">
        <div>
          <h1>Pathfinder Visualizer</h1>
        </div>
        <div className="navitem">
          <button className="btn" onClick={() => dijkstra()}>
            <span>Visualize</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
