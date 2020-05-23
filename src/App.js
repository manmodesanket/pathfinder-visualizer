import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Arena from "./components/Arena";
import Info from "./components/Info";
import useDropDown from "./components/useDropdown";
import GridContext from "./GridContext";
import {
  dijkstraAlgo,
  getNodesInShortestPathOrder
} from "./algorithms/dijkstra";
import bfsAlgo from "./algorithms/bfs";
import "./css/styles.css";

const START_ROW = 5;
const START_COL = 5;
const DEST_ROW = 10;
const DEST_COL = 35;

const App = () => {
  const [grid, setGrid] = useState([]);
  const [algo, DropDown] = useDropDown("Dijkstra", ["Dijskstra", "BFS"]);
  const [work, setWork] = useState(false);
  useEffect(() => {
    const newGrid = getInitialGrid();
    setGrid(newGrid);
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    //console.log(nodesInShortestPathOrder);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        setWork(false);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-visited";
        } else if (node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 20 * i);
    }
  };

  const animateShortestPath = nodesInShortestPathOrder => {
    //console.log(nodesInShortestPathOrder);
    const s = getStart();
    const e = getEnd();
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      //console.log(i);
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-shortest-path";
        } else if (node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-shortest-path";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  };
  const dijkstra = () => {
    //console.log(work);
    if (work === false) {
      setWork(true);
      const grid1 = grid;
      const s = getStart();
      const e = getEnd();
      const startNode = grid1[s[0]][s[1]];
      const destNode = grid1[e[0]][e[1]];
      const visitedNodesInOrder = dijkstraAlgo(grid1, startNode, destNode);
      //console.log(visitedNodesInOrder);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(destNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  const bfs = () => {
    if (work === false) {
      const grid1 = grid;
      const s = getStart();
      const e = getEnd();
      const startNode = grid1[s[0]][s[1]];
      const destNode = grid1[e[0]][e[1]];
      const visitedNodesInOrder = bfsAlgo(grid1, startNode, destNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(destNode);
      //console.log(visitedNodesInOrder);
      //console.log(nodesInShortestPathOrder);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
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

  const clearPath = () => {
    const newGrid = grid.map(row => {
      return row.map(node => {
        if (node.isVisited) {
          node.isVisited = false;
        }
        return node;
      });
    });

    setGrid(newGrid);
  };

  return (
    <GridContext.Provider value={[grid, setGrid]}>
      <div className="App">
        <div className="nav">
          <div className="navbar">
            <div className="navitem">
              <header>Pathfinder Visualizer</header>
            </div>
            <div className="navitem">
              <DropDown />
            </div>
            <div className="navitem">
              <button
                className="btn"
                onClick={() => {
                  if (algo === "Dijkstra") {
                    dijkstra();
                  } else if (algo === "BFS") {
                    bfs();
                  }
                }}
              >
                <span>Visualize</span>
              </button>
            </div>
          </div>
          <div className="navitem">
            <button onClick={() => clearPath()}>
              <span>Clear</span>
            </button>
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
        previousNode: null
      };
      currentRow.push(node);
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

ReactDOM.render(<App />, document.getElementById("root"));
