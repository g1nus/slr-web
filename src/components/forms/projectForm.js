import React, {useEffect, useState, useContext} from "react";
import {projectsDao} from 'src/dao/projects.dao'

import CloseButton from 'src/components/svg/closeButton';

import { AppContext } from 'src/components/providers/appProvider'

/**
 * this is the form for create or edit the project
 * @param props.project  project object if we want to update a old project
 * @param null if we want to create a new project
 */
function ProjectForm(props) {

    //fields values
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    //get data from global context
    const appConsumer = useContext(AppContext);

    /**
     * action to create a new project
      */
    async function createProject(e) {
        //disable default action
        e.preventDefault();
        //prepare the data object to post
        let bodyData = {name: name, description:description};
        //call dao
        let res = await projectsDao.postProject(bodyData);

        //error checking
        if(res.message){
            //pass error object to global context
            appConsumer.setError(res);
        }
        props.history.push("/projects/" + res.id);
    }

    /**
     * action to update a old project(not used yet)
     */
    async function updateProject(e) {
        //disable default action
        e.preventDefault();
        //prepare the data object to post
        let bodyData = {name: name, description: description};
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
            }}><CloseButton/></button>
            <br/>
            <input 
                defaultValue={name}
                onChange={e => setName(e.target.value)}
                type="text" 
                placeholder="project name"/>
            <br/>
            <br/>
            <textarea 
                defaultValue={description}
                onChange={e => setDescription(e.target.value)}
                type="text" 
                placeholder="project description"/>
            <br/>
            <button type="submit" onClick={submitAction} value="submit">Add project</button>
        </form>
        </>
    );


}


export default ProjectForm;