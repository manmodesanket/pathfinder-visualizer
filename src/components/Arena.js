import React from "react";
import Node from "./Node";
import "../css/arena.css";

const START_ROW = 5;
const START_COL = 5;
const DEST_ROW = 10;
const DEST_COL = 35;

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
                return <Node key={j} node={node}></Node>;
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
      let node = {
        row: row,
        col: col,
        isSelected: false,
        isStart: row === START_ROW && col === START_COL,
        isEnd: row === DEST_ROW && col === DEST_COL,
        isVisited: false,
        previousNull: false,
      };
      currentRow.push(node);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export default Arena;
