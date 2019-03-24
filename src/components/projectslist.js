import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {projectsDao} from '../dao/projects.dao'
import LoadIcon from '../components/loadicon';
import join from '../utils/stringUtils';

/**
 *this component will show a projects list
 */

const ProjectsList = ({match}) => {

    const [projectslist, setProjectsList] = useState([]);
    //bool variable to decide show  or not show list
    const [fetching, setFetching] = useState(true);

    useEffect(() => {

        //a wrapper function ask by reat hook
        const fetchData = async () => {
            //call the dao
            const res = await projectsDao.getProjectsList();

            //update only when there is a result
            if (res !== null) {
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

    if (fetching) {
        return <LoadIcon></LoadIcon>;
    }
    else {
        return (
            <div className="project-cards-holder">
                <div className="title">PROJECTS</div>
                {projectslist.map((element, index) =>
                    <Link key={index} to={join(match.url,"/"+element.id)}>
                        <div className="light-modal project-card">
                            <h3>{element.data.name}</h3>
                            <p>{element.data.description}</p>
                        </div>
                    </Link>
                )}
            </div>

        );
    }
}

export default ProjectsList;