import React from "react";
import Node from "./Node";
import "../css/arena.css";

class Arena extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }
  componentDidMount() {
    const newGrid = getInitialGrid();
    this.setState({
      grid: [...newGrid],
    });
  }
  render() {
    console.log(this.state.grid);
    if (this.state.grid.length === 0) {
      return (
        <div className="arena">
          <h1>Arena Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="arena">
          {this.state.grid.map((row, i) => (
            <div key={i} className="row">
              {row.map((node, j) => {
                const { x, y } = node;
                return <Node key={j}></Node>;
              })}
            </div>
          ))}
        </div>
      );
    }
  }
}

const getInitialGrid = () => {
  let newGrid = [];
  for (let row = 0; row < 20; row++) {
    let currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push([row, col]);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export default Arena;
