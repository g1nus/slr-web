import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */

//default title found on the navbar
const defaultTitles = ["HOME", "PROJECTS", "ACCOUNT"];

const NavBar = function(props){

    //get data from global context
    const appConsumer = useContext(AppContext);

    //this is used as a toggle for checking if the user is trying to edit the name of the project
    const [editing, setEditing] = useState(false);

    //checks if there's an edit request
    function handleEditRequest(e){
        if(!editing){//if the user is not editing the name yet(the check is useful because handleEditRequest and handleConfirm fire at the same time)
            document.getElementById("edit-project-name-input").focus();
            setEditing(!editing);
        }
    }

    //checks if the user wants to confirm the change
    function handleConfirm(e){
        if(editing){//if the user was editing I confirm its request and call the api(the check is useful because handleEditRequest and handleConfirm fire at the same time)
            setEditing(!editing);
        }
    }

    
    var navElement = <></>;
    if(defaultTitles.includes(appConsumer.title)){//I check if it's a default title or a project name
        navElement = (
                    <div className="nav-elements"> <h2 className="static-title">{appConsumer.title}</h2> </div>
                );
    }else{//if it's a project name I also set up the form for editing it
        navElement = (
            <div className={(editing) ? "nav-elements" : "nav-elements hidden-form"} onClick={handleEditRequest}> <h2 style={{fontSize: (editing) ? "0px" : "21px"}}>{appConsumer.title}</h2> 
                {/*clicking on the div containing the title will allow the user to access the form for editing the project name*/}
                <form className="edit-project-name">
                    <input type="text" id="edit-project-name-input" defaultValue={appConsumer.title} style={{width: (editing) ? "" : "0px", padding: (editing) ? "" : "0px"}}
                        onBlur={(e) => {setTimeout(//when the user focuses out the input field I wait for the "edit-button" to fire, if necessary, and then I hide the form
                            function(){
                                console.log("blurring");setEditing(false);
                            },100)}}
                    />
                    <button className="edit-button" onClick={handleConfirm} type="button"><EditButton confirm={editing}/></button>
                    {/*clicking on the button will confirm the new name*/}
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