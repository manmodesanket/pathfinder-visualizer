import React from "react";
import ReactDOM from "react-dom";
import Arena from "./components/Arena";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import "./css/styles.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Info />
        <Arena />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
