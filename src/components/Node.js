import React from "react";
import "../css/node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.node);
    const {
      row,
      col,
      isStart,
      isEnd,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      isVisited,
      clear,
    } = this.props;
    let class1 = isEnd
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    if (clear == 1) {
      console.log(class1, isVisited, row, col);
    }
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${class1}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
