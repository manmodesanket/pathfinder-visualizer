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
      isVisited,
      previousNull,
    } = this.props.node;
    let class1 = isVisited
      ? "visited"
      : isStart
      ? "start"
      : isEnd
      ? "end"
      : "unvisited";
    return <div id={`node-${row}-${col}`} className={`node ${class1}`}></div>;
  }
}

export default Node;
