import React, {useState, useContext} from "react";
import {Link} from 'react-router-dom';

import UserInfo from 'src/components/navigation/userInfo';
import config from 'src/config/index';
import MenuButton from 'src/components/svg/menuButton';
import Cover from 'src/components/modules/cover';

/**
 *this is the side menu component
 */
const SideMenu = function (props) {

    //bool to control the visualization of menu
    const [shown, setShown] = useState(false);
    const [firstTime, setFirstTime] = useState(true);


    //function to open/close the menu
    function handleToggleMenuButton() {
        setShown(!shown);
        setFirstTime(false);
    }

    //function to close the menu
    function handleMenuBlur(e) {
        setShown(false);
    }

    //change the class of element by menu state
    var clsidemenu = "modal side-menu up";
    var clsbutton = "button-wrapper close";

    if (firstTime) {
        clsidemenu = "modal side-menu"
    }
    if (shown) {
        clsbutton = "button-wrapper open"
        clsidemenu = "modal side-menu down"
    }

    return (
        <div className="menu">
            <Cover cls={(shown) ? "full-screen-transparent" : ""} handler={handleMenuBlur}/>
            <div className={clsbutton} onClick={handleToggleMenuButton}>
                <MenuButton/>
            </div>

            <div className={clsidemenu} tabIndex={-1}>

                {/*user info box*/}
                <UserInfo/>
                <PrintMenu handleMenuBlur={handleMenuBlur}/>

            </div>
        </div>
    );

}

/**
 *local compotent to print menu
 */
const PrintMenu = function (props) {

    let output = (
        config.menu_list.map((element, index) => (
                <div key={index}>
                    <Link to={element.link} className="menu-option"
                          onMouseUp={props.handleMenuBlur}>{element.content}</Link>
                </div>
            )
        )
    );
    return output;


}


export default SideMenu;