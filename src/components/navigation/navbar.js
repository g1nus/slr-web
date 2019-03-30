import React from "react";



/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */

const NavBar = function(props){
    return (
        <div className="navigation-wrapper">

            {/*background of the menu-bar*/}
            <nav className="main-nav"></nav>
            {props.children}

        </div>
    );
}

export default NavBar;