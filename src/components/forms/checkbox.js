import React from "react";

const CheckBox = ({ label, isSelected, handler }) => (
    <label className="checkbox-container">
      <input type="checkbox" name={label} checked={isSelected} onChange={handler} />
      <span className="checkmark"></span>
      <span>{label}</span>
    </label>
);

export default CheckBox;