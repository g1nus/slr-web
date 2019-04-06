import React from "react";

/**
 * component svg select arrow
 * 'focused' is a flag used for displaying a different shape
 */
const SelectArrow= function ({focused}) {
    var from="";
    var to="";
    //I check if the upper component is focused and then I animate
    if(focused){
        from="90,295.5 500,704.5 910,295.5 ";
        to="90,704.5 500,295.5 910,704.5 ";;
    }else{
        from="90,704.5 500,295.5 910,704.5 ";;
        to="90,295.5 500,704.5 910,295.5 ";
    }
    return (
    <svg version="1.1" id="arrow-select" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 1000 1000">
            <polyline className="st-arrow-select" points={from}>
            <animate attributeType="XML" id="ani-select-arrow" attributeName="points" from={from} to={to} begin="0s" dur="0.2s" repeatCount="1" fill="freeze" />
            </polyline>
        </svg>
    );
};

export default SelectArrow;

