import React from "react";
import ReactDOM from "react-dom";
import Arena from "./components/Arena";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import "./css/styles.css";

const START_ROW = 5;
const START_COL = 5;
const DEST_ROW = 10;
const DEST_COL = 35;

class App extends React.Component {
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
    if (this.state.grid.length === 0) {
      return (
        <div className="App">
          <Navbar />
          <Info />
          <Arena grid={this.state.grid} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
          <Info />
          <Arena grid={this.state.grid} />
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
        distance: Infinity,
        previousNull: false,
      };
      currentRow.push(node);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

ReactDOM.render(<App />, document.getElementById("root"));
