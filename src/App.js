import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Arena from "./components/Arena";
import Info from "./components/Info";
import GridContext from "./GridContext";
import {
  dijkstraAlgo,
  getNodesInShortestPathOrder,
} from "./algorithms/dijkstra";
import bfsAlgo from "./algorithms/bfs";
import "./css/styles.css";

const START_ROW = 5;
const START_COL = 5;
const DEST_ROW = 10;
const DEST_COL = 35;

const App = () => {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    const newGrid = getInitialGrid();
    setGrid(newGrid);
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    console.log(nodesInShortestPathOrder);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        console.log("hello");
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    console.log(nodesInShortestPathOrder);
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      console.log(i);
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };
  const dijkstra = () => {
    const grid1 = grid;
    const s = getStart();
    const e = getEnd();
    const startNode = grid1[s[0]][s[1]];
    const destNode = grid1[e[0]][e[1]];
    const visitedNodesInOrder = dijkstraAlgo(grid1, startNode, destNode);
    //console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(destNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const bfs = () => {
    const grid1 = grid;
    const s = getStart();
    const e = getEnd();
    const startNode = grid1[s[0]][s[1]];
    const destNode = grid1[e[0]][e[1]];
    const visitedNodesInOrder = bfsAlgo(grid1, startNode, destNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(destNode);
    console.log(visitedNodesInOrder);
    console.log(nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const getStart = () => {
    //console.log("Hello");
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (grid[row][col].isStart === true) {
          //console.log(row, col);
          return [row, col];
        }
      }
    }
  };

  const getEnd = () => {
    //console.log("Hello");
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (grid[row][col].isEnd === true) {
          //console.log(row, col);
          return [row, col];
        }
      }
    }
  };

  return (
    <GridContext.Provider value={[grid, setGrid]}>
      <div className="App">
        <div className="nav">
          <div className="navbar">
            <div className="navitem">
              <h2>Pathfinder Visualizer</h2>
            </div>
            <div className="navitem">
              <button className="btn" onClick={() => bfs()}>
                <span>Visualize</span>
              </button>
            </div>
          </div>
        </div>
        <Info />
        <Arena />
      </div>
    </GridContext.Provider>
  );
};

const getInitialGrid = () => {
  let newGrid = [];
  for (let row = 0; row < 20; row++) {
    let currentRow = [];
    for (let col = 0; col < 50; col++) {
      let node = {
        row: row,
        col: col,
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
