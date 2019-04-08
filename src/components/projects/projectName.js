import React, {useContext,useState,useEffect} from "react";

import EditButton from "src/components/svg/editButton";

/**
 * this is the head component of page
 * @param "menu_elements" contains the list of menu-items
 */


const ProjectName = function({name, update}){

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
            update();
            setEditing(!editing);
        }
    }

    return(
        <div className={(editing) ? "nav-elements" : "nav-elements hidden-form"}> <h2 style={{fontSize: (editing) ? "0px" : "21px"}}>{name}</h2> 
            {/*clicking on the div containing the title will allow the user to access the form for editing the project name*/}
            <form className="edit-project-name"  onClick={handleEditRequest} onSubmit={(e) => {e.preventDefault()}}>
                <input type="text" id="edit-project-name-input" defaultValue={name} style={{width: (editing) ? "" : "0px", padding: (editing) ? "" : "0px"}}
                    onBlur={(e) => {setEditing(false)}}
                />
                <button className="edit-button" onMouseDown={handleConfirm} type="button"><EditButton confirm={editing}/></button>
                {/*clicking on the button will confirm the new name*/}
            </form>
        </div>
    );
}

export default ProjectName;