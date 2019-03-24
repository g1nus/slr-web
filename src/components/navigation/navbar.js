import React from "react";
import SideMenu from './sidemenu';


/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */

const NavBar = ({menuhandler, user_elements, menu_elements}) => {
    return (
        <div className="navigation-wrapper">

            {/*background of the menu-bar*/}
            <nav className="main-nav"></nav>
            {/*component menu*/}
            <SideMenu handler={menuhandler} user={user_elements} menu_elements={menu_elements}></SideMenu>

        </div>
    );
}

export default NavBar;