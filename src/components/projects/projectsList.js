import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';

import {projectsDao} from './../../dao/projects.dao';
import LoadIcon from './../svg/loadIcon';
import ProjectForm from './../forms/projectForm';
import join from './../../utils/stringUtils';

/**
 *this component will show a projects list page
 */

const ProjectsList = function(props) {


    //projects list
    const [projectslist, setProjectsList] = useState([]);
    //bool to control the visualization of page
    const [fetching, setFetching] = useState(true);
    //bool to control the visualization of input form
    const [toggleform, setToggleForm] = useState(false);

    useEffect(() => {

        //a wrapper function ask by reat hook
        const fetchData = async () => {
            //call the dao
            const res = await projectsDao.getProjectsList();
            //update only when there is a result

            if (res !== null) {
                //update state
                if(res.message){//I check if I get an error message
                    setProjectsList({"results": [{"data": {"name": res.message}}]});//momentary way to display error message as a project
                }else{//if there's no error message it means I got a list of projects
                    setProjectsList(res);
                }
                setFetching(false);
            }

        }
        fetchData();
        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectsDao.abortRequest();
        };
    }, []);

    //if the page is loading
    if (fetching) {
        //print svg image
        return <LoadIcon></LoadIcon>;
    }
    else {

        return (
            <div>
                {/*print list of projects*/}
                <PrintList projectslist={projectslist} {...props} />
                {/*print the input form to create/update the projects*/}
                <ProjectForm visibility={toggleform} setVisibility={setToggleForm}></ProjectForm>
                {/*button to show input form*/}
                <button className="bottom-left-btn" type="button" value="toggle-insert-form"  onClick={(e) => { setToggleForm(!toggleform); }}>
                    +
                </button>
            </div>
        );

    }
};


/**
 *local component to print list
 */
const PrintList = function(props){

    return(
        <div className="project-cards-holder">
            <div className="title">PROJECTS</div>
            {props.projectslist.results.map((element, index) =>
                <Link key={index} to={join(props.match.url,"/"+element.id)}>
                    <div className="light-modal project-card">
                        <h3>{element.data.name}</h3>
                        <p>{element.data.description}</p>
                    </div>
                </Link>
            )}
        </div>

    );

}


export default ProjectsList;