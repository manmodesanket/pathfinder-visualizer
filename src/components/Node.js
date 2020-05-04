import React from "react";
import "../css/node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.key);
    return <div className="node"></div>;
  }
}

export default Node;
