import React from "react";

/**
 * component svg menu button
 */
const SearchButton = function (props) {

    return (
        <svg id="search-icon" xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 1000 1000">
            <path className="st0" d="M626.9,644.3c-73.5,0-142.6-28.6-194.6-80.6s-80.6-121.1-80.6-194.6s28.6-142.6,80.6-194.6
                c52-52,121.1-80.6,194.6-80.6c73.5,0,142.6,28.6,194.6,80.6c52,52,80.6,121.1,80.6,194.6s-28.6,142.6-80.6,194.6
                S700.4,644.3,626.9,644.3z"/>
            <line className="st1" x1="145.2" y1="850.8" x2="431.7" y2="564.3"/>
        </svg>
    );
};

export default SearchButton;
