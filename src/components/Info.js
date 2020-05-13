import React from "react";

const Info = () => {
  return (
    <div className="info">
      <div className="info-item">
        <div className="info-node start"></div>
        <div className="title">Start Node</div>
      </div>
      <div className="info-item">
        <div className="info-node end"></div>
        <div className="title">End Node</div>
      </div>
      <div className="info-item">
        <div className="info-node visited1"></div>
        <div className="info-node visited2"></div>
        <div className="title">Visited Node</div>
      </div>
      <div className="info-item">
        <div className="info-node"></div>
        <div className="title">Unvisited Node</div>
      </div>
      <div className="info-item">
        <div className="info-node path"></div>
        <div className="title">Shortest Path</div>
      </div>
      <div className="info-item">
        <div className="info-node wall"></div>
        <div className="title">Wall</div>
      </div>
    </div>
  );
};

export default Info;
