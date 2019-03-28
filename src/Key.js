import React from "react";

import "./Key.css";

const Key = ({index, keyName, onclick }) => (
    <div className={keyName} onClick={(e) => {onclick(keyName); e.currentTarget.classList.add('click')}}>
      <span className="letter">{keyName}</span>
    </div>
);

export default Key;
