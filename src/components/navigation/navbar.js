import React from "react";
import SideMenu from './sideMenu';


/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */

const NavBar = function(props){
    return (
        <div className="navigation-wrapper">

            {/*background of the menu-bar*/}
            <nav className="main-nav"></nav>
            {/*component menu*/}
            <SideMenu/>

        </div>
    );
}

export default NavBar;