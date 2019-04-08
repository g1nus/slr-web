import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */


const NavBar = function(props){

    //get data from global context
    const appConsumer = useContext(AppContext);

    
    return (
        <div className="navigation-wrapper">

            {/*background of the menu-bar*/}
            <nav className="main-nav">
                {appConsumer.title}
            </nav>
            {props.children}

        </div>
    );
}

export default NavBar;