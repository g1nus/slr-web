import React, {useEffect, useRef, useContext} from "react";
import {projectsDao} from './../../dao/projects.dao'

import { AppContext } from './../providers/appProvider'

/**
 * this is the form for create or edit the project
 * @param props.project  project object if we want to update a old project
 * @param null if we want to create a new project
 */
function ProjectForm(props) {

    //field of project name
    const projectName = useRef(null);
    //field of project description
    const projectDescription = useRef(null);

    //get data from global context
    const appConsumer = useContext(AppContext);

    /**
     * action to create a new project
      */
    async function createProject(e) {
        //disable default action
        e.preventDefault();
        //prepare the data object to post
        let bodyData = {name: projectName.current.value, description: projectDescription.current.value};
        //call dao
        let res = await projectsDao.postProject(bodyData);

        //error checking
        if(res.message){
            //pass error object to global context
            appConsumer.setError(res);
        }

        alert("inserted correctly");
    }

    /**
     * action to update a old project
     */
    async function updateProject(e) {
        //disable default action
        e.preventDefault();
        //prepare the data object to post
        let bodyData = {name: projectName.current.value, description: projectDescription.current.value};
        //call dao  with project_id and data object
        let res = await projectsDao.putProject(props.project.id, bodyData);

        //error checking
        if(res.message){
            //pass error object to global context
            appConsumer.setError(res);
        }

        alert("updated correctly");
    }


    //defalut input values are empty
    let projectInputData = {name: "", description: ""};
    //default action is create a project
    let submitAction = createProject;
    //if we want update a old project
    if (props.project !== undefined) {
        //get old project data
        projectInputData.name = props.project.data.name;
        projectInputData.description = props.project.data.description;
        //set action as update
        submitAction = updateProject;
    }

    return (
        <>
        <form className="modal add-project" style={{visibility: (!props.visibility) ? 'hidden' : '' }}>
            <button type="button" className="close-btn" onClick={(e) => {
                props.setVisibility(!props.visibility);
            }}>X</button>
            <label>name</label>
            <br/>
            <input ref={projectName} type="text" defaultValue={projectInputData.name}/>
            <br/>
            <label>description</label>
            <br/>
            <input ref={projectDescription} type="text" defaultValue={projectInputData.description}/>
            <br/>
            <button type="submit" onClick={submitAction} value="submit">submit</button>
        </form>
        </>
    );


}


export default ProjectForm;