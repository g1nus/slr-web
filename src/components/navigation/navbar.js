import React from "react";
import SideMenu from './sidemenu';

const NavBar = ({ menuhandler, user_elements, menu_elements}) => {
  return(
    <div className="navigation-wrapper">
      <nav className="main-nav"> </nav>
      <SideMenu handler={menuhandler} user={user_elements} menu_elements={menu_elements}></SideMenu>
    </div>
  );
}

export default NavBar;