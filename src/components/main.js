import React from "react";

/**
 * compotent main of page
 */
const Main = function(props){

        return (
            <div className="main-wrapper">
                {props.children}
            </div>
        );
};

export default Main;