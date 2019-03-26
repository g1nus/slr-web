import React from "react";

const CheckBox = ({ val, label, isSelected, handler }) => (
    <label className="checkbox-container">
      <input type="checkbox" value={val} name={label} checked={isSelected} onChange={handler} />
      <span className="checkmark"></span>
      <span>{label}</span>
    </label>
);

export default CheckBox;