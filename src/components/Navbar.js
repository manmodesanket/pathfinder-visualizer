import React from "react";
import useDropdown from "./useDropdown";
import dijkstra from "../algorithms/dijkstra";
import "../css/navbar.css";

const Navbar = () => {
  const ALGORITHMS = ["Dijikstra", "Depth-First", "Breadth-First"];
  const [algorithm, AlgorithmDropDown] = useDropdown("Dijiskstra", ALGORITHMS);
  return (
    <nav className="navbar">
      <div>
        <h1>Pathfinder Visualizer</h1>
      </div>
      <div className="navitem">
        <button className="btn" onClick={() => dijkstra()}>
          <span>Visualize</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
