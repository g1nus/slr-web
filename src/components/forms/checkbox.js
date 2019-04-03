import React from "react";

const CheckBox = ({ value, label, isChecked, handler }) => (
    <label className="checkbox-container">
      <input type="checkbox" value={value} name={label} defaultChecked={isChecked} onChange={handler} />
      <span className="checkmark"></span>
      <span>{label}</span>
    </label>
);

export default CheckBox;