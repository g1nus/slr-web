import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//the projects will be fetched through an api
const PROJECTS = [{id:"1", name:"project one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"2", name:"project two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"3", name:"project three", description:""}];

const ProjectPage = ({ match }) => {
  console.log("project page: " +match)
  return(
    <div className="project-wrapper">
        <div>{match.params.id}</div>
        <div className="nav-link-wrapper">
        <Link to={match.url + "/search"}><div>search[link]</div></Link>
        <Link to={match.url}><div>project[link]</div></Link>
            <div
              className={"underline underline-to-left"}
            />
          </div>
        <Route path = {match.url + "/search"} render={() => <div>search</div>} />
    </div>        

  );
}

export default ProjectPage;