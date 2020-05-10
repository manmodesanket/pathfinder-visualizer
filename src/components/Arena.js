import React, { useState, useEffect } from "react";
import Node from "./Node";
import "../css/arena.css";

function Arena(props) {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setmouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    //setmouseIsPressed(!mouseIsPressed);
    setmouseIsPressed(true);
  };

  const handleMouseEnterStart = (row, col) => {
    if (mouseIsPressed) return;
    //const newGrid = getNewGridWithWallToggled(grid, row, col);
    grid[row][col].isStart = true;
    console.log(grid[row][col]);
    setGrid(grid);
  };

  const handleMouseEnter = (row, col) => {
    //console.log(mouseIsPressed);
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = () => {
    setmouseIsPressed(false);
  };

  useEffect(() => {
    setGrid(props.grid);
  });

  if (grid.length === 0) {
    return (
      <div className="arena">
        <h1>Arena Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="arena">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((node, j) => {
              const { row, col, isStart, isEnd, isWall, isVisited } = node;
              return (
                <Node
                  key={j}
                  col={col}
                  row={row}
                  node={node}
                  isEnd={isEnd}
                  isStart={isStart}
                  isWall={isWall}
                  isVisited={isVisited}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => {
                    if (!grid[row][col].isStart) {
                      handleMouseEnter(row, col);
                    } else {
                      console.log("h");
                      handleMouseEnterStart(row, col);
                    }
                  }}
                  onMouseUp={() => handleMouseUp()}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Arena;
