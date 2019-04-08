import React, {useContext} from "react";



/**
 * component for covering the page
 */
const Cover = function ({cls, handler}) {
    //get data from global context
    return (
        <div className={"cover " + cls} onClick={(e) => {handler(false)}}></div>
    );
};

export default Cover;