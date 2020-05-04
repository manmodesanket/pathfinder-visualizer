import React from "react";
import Node from "./Node";

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
            <div key={i}>
              {row.map((node, nodeIdx) => (
                <Node key={nodeIdx} row={row}></Node>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
}

const getInitialGrid = () => {
  let newGrid = [];
  for (let col = 0; col < 20; col++) {
    let currentRow = [];
    for (let row = 0; row < 50; row++) {
      currentRow.push([col, row]);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export default Arena;
