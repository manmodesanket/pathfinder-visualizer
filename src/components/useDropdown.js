import React, { useState } from "react";
import "../css/dropdown.css";

const useDropdown = (defaultState, options) => {
  const [state, updateState] = useState(defaultState);
  //const id = `dropdown`;
  const Dropdown = () => (
    <div className="dropdown-wrap">
      <select
        value={state}
        onChange={(e) => updateState(e.target.value)}
        onBlur={(e) => updateState(e.target.value)}
        disabled={options.length === 0}
        className="dropdown"
      >
        {options.map((item) => (
          <option key={item} value={item} className="option">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
  return [state, Dropdown, updateState];
};

export default useDropdown;
