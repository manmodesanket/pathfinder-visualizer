import React from "react";
import Node from "./Node";
import "../css/arena.css";

class Arena extends React.Component {
  render() {
    //console.log(this.state.grid);
    if (this.props.grid.length === 0) {
      return (
        <div className="arena">
          <h1>Arena Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="arena">
          {this.props.grid.map((row, i) => (
            <div key={i} className="row">
              {row.map((node, j) => {
                //const { x, y } = node;
                return <Node key={j} node={node}></Node>;
              })}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Arena;
