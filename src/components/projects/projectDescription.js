import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the description component for the project page
 */


const ProjectDscription = function({description, update}){

    //get data from global context
    const appConsumer = useContext(AppContext);

    const [editing, setEditing] = useState(false);

    function handleEditRequest(e){
        console.log("edit request("+editing+")");
        if(!editing){
            document.getElementById("edit-project-description-input").focus();
            setEditing(true);
            console.log(editing)
        }else{
            console.log("this is a cofirm request")
        }
    }


    return (
        <div className={(!editing) ? "project-description hidden-form-description" : "project-description"}>
            <h2>description:</h2>
            <p style={{fontSize: (editing) ? "0px" : "15px"}}> {description}</p>
            <form className="edit-project-description">
                    <textarea id="edit-project-description-input"  defaultValue={description} style={{width: (editing) ? "100%" : "0%", padding: (editing) ? "" : "0px", height:(editing) ? "" : "0px"}}
                    onBlur={(e) => {setTimeout(
                                function(){
                                    console.log("blurring");setEditing(false);
                                },100)}}
                    />
                    <button className="edit-button" onClick={handleEditRequest} type="button"><EditButton confirm={editing}/></button>
                </form>
        </div>
    );
}

export default ProjectDscription;