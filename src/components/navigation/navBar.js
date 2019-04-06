import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */

const defaultTitles = ["HOME", "PROJECTS", "ACCOUNT"];

const NavBar = function(props){

    //get data from global context
    const appConsumer = useContext(AppContext);

    const [editing, setEditing] = useState(false);

    function handleEditRequest(e){
        console.log("edit request");
        if(!editing){
            setEditing(!editing);
        }
    }
    function handleConfirm(e){
        console.log("confirm request");
        if(editing){
            setEditing(!editing);
        }
    }

    
    var navElement = <></>;
    if(defaultTitles.includes(appConsumer.title)){//I check if it's a default title or a project name
        navElement = (
                    <div className="nav-elements"> <h2 class="static-title">{appConsumer.title}</h2> </div>
                );
    }else{
        navElement = (
            <div className={(editing) ? "nav-elements" : "nav-elements hidden-form"} onClick={handleEditRequest}> <h2 style={{fontSize: (editing) ? "0px" : "21px"}}>{appConsumer.title}</h2> 
                <form className="edit-project-name">
                    <input type="text" defaultValue={appConsumer.title} style={{width: (editing) ? "" : "0px", padding: (editing) ? "" : "0px"}}
                        onClick={(e) => {appConsumer.setTitle(e.target.value);}} onBlur={(e) => {setEditing(false)}}
                    />
                    <button className="edit-button" onClick={handleConfirm} type="button"><EditButton confirm={editing}/></button>
                </form>
            </div>
            );
    }
    return (
        <div className="navigation-wrapper">

            {/*background of the menu-bar*/}
            <nav className="main-nav">
                {navElement}
            </nav>
            {props.children}

        </div>
    );
}

export default NavBar;