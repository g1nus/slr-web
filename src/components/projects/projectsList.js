import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';

import {projectsDao} from './../../dao/projects.dao';
import LoadIcon from './../svg/loadIcon';
import ProjectForm from './../forms/projectForm';
import join from './../../utils/stringUtils';
import {AppContext} from "./../../providers/appProvider";

/**
 *this component will show a projects list page
 */

const ProjectsList = function (props) {


    //projects list
    const [projectslist, setProjectsList] = useState([]);
    //bool to control the visualization of page
    const [fetching, setFetching] = useState(true);
    //bool to control the visualization of input form
    const [toggleform, setToggleForm] = useState(false);

    //get data from global context
    const appConsumer = useContext(AppContext);

    useEffect(() => {

        //a wrapper function ask by reat hook
        const fetchData = async () => {

                //call the dao
                const res = await projectsDao.getProjectsList();

                //error checking
                //if is 404 error
                if(res.message == "Not Found"){
                    setProjectsList(null);
                    setFetching(false);
                }
                //if is other error
                else if(res.message){
                    //pass error object to global context
                    appConsumer.setError(res);
                }
                //if res isn't null
                else if (res !== null){
                    //update state
                    setProjectsList(res);
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
    //if the result is empty
    else if(projectslist === null){
        return(
            <div className="project-cards-holder">
                <div className="title">PROJECTS</div>
                <div>there aren't projects</div>
            </div>
        )
    }
    else {

        return (
            <div>
                {/*print list of projects*/}
                <PrintList projectslist={projectslist} {...props} />
                {/*print the input form to create/update the projects*/}
                <ProjectForm visibility={toggleform} setVisibility={setToggleForm}></ProjectForm>
                {/*button to show input form*/}
                <button className="bottom-left-btn" type="button" value="toggle-insert-form" onClick={(e) => {
                    setToggleForm(!toggleform);
                }}>
                    +
                </button>
            </div>
        );

    }
};


/**
 *local component to print list
 */
const PrintList = function (props) {

    return (
        <div className="project-cards-holder">
            <div className="title">PROJECTS</div>
            {props.projectslist.results.map((element, index) =>
                <Link key={index} to={join(props.match.url, "/" + element.id)}>
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