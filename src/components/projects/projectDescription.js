import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the description component for the project page
 */


const ProjectDscription = function({description, update}){


    //this is used as a toggle for checking if the user is trying to edit the name of the project
    const [editing, setEditing] = useState(false);

    //handles the click on the edit/confirm button
    function handleEditRequest(e){
        console.log("CLICK")
        if(!editing){//if the user was not editing I allow him to edit
            setTimeout(//I wait for the button event to fire before blurring out the textares
                function(){
                    document.getElementById("edit-project-description-input").focus();
                },100)
            
            setEditing(true);
            console.log(editing)
        }else{//if the user was editing I submit its changes
            update();
        }
    }


    return (
        <div className={(!editing) ? "project-description hidden-form-description" : "project-description"}>
            <h2>description:</h2>
            <p style={{fontSize: (editing) ? "0px" : "15px"}}> {description}</p>
            <form className="edit-project-description">
                    <textarea id="edit-project-description-input"  defaultValue={description} style={{width: (editing) ? "100%" : "0%", padding: (editing) ? "" : "0px", height:(editing) ? "" : "0px"}}
                    onBlur={(e) => {
                                    console.log("blurring");setEditing(false);
                                }}
                    />
                    <button className="edit-button" onMouseDown={handleEditRequest} type="button"><EditButton confirm={editing}/></button>
                </form>
        </div>
    );
}

export default ProjectDscription;