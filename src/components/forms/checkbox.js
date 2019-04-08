import React from "react";

const CheckBox = ({ val, label, isChecked, handler }) => (
    <label className="checkbox-container">
      <input type="checkbox" value={val} name={label} defaultChecked={isChecked} onChange={handler} />
      <span className="checkmark"></span>
      <span>{label}</span>
    </label>
);

export default CheckBox;