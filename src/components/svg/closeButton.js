import React from "react";

/**
 * component svg close-btn
 */
const CloseButton = function (props) {

    return (
        <svg id="close-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1000 1000">
        <line className="ln" x1="134" y1="866" x2="866" y2="134"/>
        <line className="ln" x1="134" y1="134" x2="866" y2="866"/>
        </svg>
    );
};

export default CloseButton;
