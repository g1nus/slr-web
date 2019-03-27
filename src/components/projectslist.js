import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {projectsDao} from '../dao/projects.dao';
import LoadIcon from '../components/loadicon';
import ProjectForm from '../components/forms/projectForm';
import join from '../utils/stringUtils';

/**
 *this component will show a projects list
 */

const ProjectsList = ({match}) => {

    const [toggleform, setToggleForm] = useState(false);
    const [projectslist, setProjectsList] = useState([]);
    //bool variable to decide show  or not show list
    const [fetching, setFetching] = useState(true);

    useEffect(() => {

        //a wrapper function ask by reat hook
        const fetchData = async () => {
            //call the dao
            const res = await projectsDao.getProjectsList();
            //update only when there is a result
            console.log(res);
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

    if (fetching) {
        return <LoadIcon></LoadIcon>;
    }
    else {
        return (
            <>
                <div className="project-cards-holder">
                    <div className="title">PROJECTS</div>
                    {projectslist.results.map((element, index) =>
                        <Link key={index} to={join(match.url,"/"+element.id)}>
                            <div className="light-modal project-card">
                                <h3>{element.data.name}</h3>
                                <p>{element.data.description}</p>
                            </div>
                        </Link>
                    )}
                </div>
                <ProjectForm visibility={toggleform} setVisibility={setToggleForm}></ProjectForm>
                <button className="bottom-left-btn" type="button" value="toggle-insert-form"
                onClick={(e) => {
                    setToggleForm(!toggleform);
                  }}
                >+</button>
            </>

        );
    }
}

export default ProjectsList;