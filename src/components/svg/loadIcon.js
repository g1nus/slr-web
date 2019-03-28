import React from "react";

/**
 * component svg loading-icon
 */
const LoadIcon = function (props) {

    return (

        <svg id="loading-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
             y="0px"
             viewBox="0 0 1000 1000">
            <g>
                <path id="loading-circle1" d="
                  M 500, 500
                  m -160, 0
                  a 160,160 0 1,0 320,0
                  a 160,160 0 1,0 -320,0
          "/>
                <path id="loading-circle2" d="
                  M 500, 500
                  m -305, 0
                  a 305,305 0 1,0 610,0
                  a 305,305 0 1,0 -610,0
          "/>
            </g>
        </svg>
    );
};

export default LoadIcon;
