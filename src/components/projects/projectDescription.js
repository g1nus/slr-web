import React, {useContext,useState,useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";
import EditButton from "src/components/svg/editButton";

/**
 * this is the description component for the project page
 */


const ProjectDscription = function({description}){

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
    /*if(defaultTitles.includes(appConsumer.title)){//I check if it's a default title or a project name
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
    }*/
    return (
        <div className={(!editing) ? "project-description hidden-form-description" : "project-description"}>
            <h2>description:</h2>
            <p style={{fontSize: (editing) ? "0px" : "15px"}}> {description}</p>
            <form className="edit-project-description">
                    <textarea defaultValue={description} style={{width: (editing) ? "100%" : "0%", padding: (editing) ? "" : "0px", height:(editing) ? "" : "0px"}}
                        onChange={(e) => {}}
                    />
                    <button className="edit-button" onClick={(!editing) ? handleEditRequest : handleConfirm} type="button"><EditButton confirm={editing}/></button>
                </form>
        </div>
    );
}

export default ProjectDscription;