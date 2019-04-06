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
        if(!editing){
            console.log("edit request");
            document.getElementById("edit-project-name-input").focus();
            setEditing(!editing);
        }
    }
    function handleConfirm(e){
        if(editing){
            console.log("confirm request");
            setEditing(!editing);
        }
    }

    
    var navElement = <></>;
    if(defaultTitles.includes(appConsumer.title)){//I check if it's a default title or a project name
        navElement = (
                    <div className="nav-elements"> <h2 className="static-title">{appConsumer.title}</h2> </div>
                );
    }else{
        navElement = (
            <div className={(editing) ? "nav-elements" : "nav-elements hidden-form"} onClick={handleEditRequest}> <h2 style={{fontSize: (editing) ? "0px" : "21px"}}>{appConsumer.title}</h2> 
                <form className="edit-project-name">
                    <input type="text" id="edit-project-name-input" defaultValue={appConsumer.title} style={{width: (editing) ? "" : "0px", padding: (editing) ? "" : "0px"}}
                        onBlur={(e) => {setTimeout(
                            function(){
                                console.log("blurring");setEditing(false);
                            },100)}}
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