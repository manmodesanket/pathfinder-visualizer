import React from "react";
import ReactDOM from "react-dom";
import Arena from "./components/Arena";
import Info from "./components/Info";
import {
  dijkstraAlgo,
  getNodesInShortestPathOrder,
} from "./algorithms/dijkstra";
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
    this.dijkstra = this.dijkstra.bind(this);
    this.animateDijkstra = this.animateDijkstra.bind(this);
    this.animateShortestPath = this.animateShortestPath.bind(this);
  }
  componentDidMount() {
    const newGrid = getInitialGrid();
    this.setState({
      grid: [...newGrid],
    });
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }
  dijkstra() {
    const grid = this.state.grid;
    const startNode = grid[START_ROW][START_COL];
    const destNode = grid[DEST_ROW][DEST_COL];
    const visitedNodesInOrder = dijkstraAlgo(grid, startNode, destNode);
    //console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(destNode);
    console.log(nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  render() {
    if (this.state.grid.length === 0) {
      return (
        <div className="App">
          <nav className="navbar">
            <div>
              <h1>Pathfinder Visualizer</h1>
            </div>
            <div className="navitem">
              <button className="btn" onClick={() => this.dijkstra()}>
                <span>Visualize</span>
              </button>
            </div>
          </nav>
          <Info />
          <Arena grid={this.state.grid} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <nav className="navbar">
            <div>
              <h1>Pathfinder Visualizer</h1>
            </div>
            <div className="navitem">
              <button className="btn" onClick={() => this.dijkstra()}>
                <span>Visualize</span>
              </button>
            </div>
          </nav>
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
        isWall: false,
        isVisited: false,
        distance: Infinity,
        previousNode: null,
      };
      currentRow.push(node);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

ReactDOM.render(<App />, document.getElementById("root"));
