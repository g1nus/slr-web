import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {projectsDao} from '../dao/projects.dao'

//the projects will be fetched through an api
const PROJECTS = [{id:"1", name:"project one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"2", name:"project two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"3", name:"project three", description:""}];

const ProjectsList = ({ match }) => {
  const [projectslist, setProjectsList] = useState([]);
  useEffect(() => {
    //a wrapper function ask by reat hook
    const fetchData = async () => {
        //call the dao
        const res = await projectsDao.getProjectsList();
        //update state
        setProjectsList(res);
    }
    fetchData();
    //when the component will unmount
    return () => {
        //stop all ongoing request
        projectsDao.abortRequest();
    };
  });
  return(
        <div className="project-cards-holder">
          {projectslist.map((element, index) => 
            <Link key={index} to={match.url + "/" + element.id}>
              <div className="modal project-card">
                <h3>{element.data.name}</h3>
                <p>{element.data.description}</p>
              </div>
            </Link>
          )}
        </div>

  );
}

export default ProjectsList;