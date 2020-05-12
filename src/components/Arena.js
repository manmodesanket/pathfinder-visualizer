import React, { useState, useEffect } from "react";
import Node from "./Node";
import "../css/arena.css";

function Arena(props) {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setmouseIsPressed] = useState(false);
  const [flag, setFlag] = useState(false);
  const [start, setStart] = useState([5, 5]);

  const handleMouseDown = (row, col) => {
    setmouseIsPressed(true);
    if (
      !grid[row][col].isStart &&
      !grid[row][col].isWall &&
      !grid[row][col].isEnd
    ) {
      console.log(grid[row][col]);
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (grid[row][col].isStart) {
      setFlag(true);
      console.log(flag);
    }
    //setmouseIsPressed(!mouseIsPressed);
  };

  const handleMouseStartDown = (row, col) => {
    setmouseIsPressed(true);

    if (!mouseIsPressed) {
      console.log(grid[row][col]);
      return;
    }
    //const newGrid = getNewGridWithWallToggled(grid, row, col);
    console.log(grid[row][col]);
  };

  const handleMouseEnter = (row, col) => {
    //console.log(mouseIsPressed);
    if (!mouseIsPressed) return;
    else if (flag && mouseIsPressed) {
      console.log(grid[row][col]);
      grid[row][col].isStart = true;
      grid[start[0]][start[1]].isStart = false;
      setStart([row, col]);
      console.log(start);
      setGrid(grid);
    } else if (!flag && mouseIsPressed) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
  };
  const handleMouseUp = () => {
    setmouseIsPressed(false);
    setFlag(false);
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
                  onMouseDown={(row, col) => {
                    handleMouseDown(row, col);
                  }}
                  onMouseEnter={(row, col) => {
                    handleMouseEnter(row, col);
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
