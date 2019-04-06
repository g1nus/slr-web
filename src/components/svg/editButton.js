import React from "react";

/**
 * component svg edit button
 */
const EditButton = function ({confirm}) {
    var output = <></>;
    console.log("CONFIRM : " + confirm)
    if(!confirm){
        output = (<svg version="1.1" id="edit-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	    viewBox="0 0 1000 1000">
            <path className="st-pencil" d="M224,632.3l-81.6,225.3L367.7,776l0,0L833,310.7c39.4-39.4,39.9-103.3,0.7-142.9c-0.5-0.5-1-1-1.4-1.4
            c-39.6-39.2-103.6-38.7-142.9,0.7L224,632.3L224,632.3z"/>
            <path className="st-pencil-border" d="M367.7,776c-24-71.7-71.9-119.6-143.7-143.7"/>
            <path className="st-pencil" d="M805.7,338c-24-71.7-71.9-119.6-143.7-143.7"/>
        </svg>);
    }else{
        output = (
            <svg version="1.1" id="confirm-edit-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	            viewBox="0 0 1000 1000">
                <polyline className="st-confirm" points="918,192.3 389.3,807.7 82,450 "/>
            </svg>
        );
    }
    return output;
};

export default EditButton;
