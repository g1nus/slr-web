import React, { useState } from "react";
import { Route, Link } from 'react-router-dom'
import { Flipper, Flipped } from 'react-flip-toolkit';

//the projects will be fetched through an api
const PROJECT = {id:"1", name:"project one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "};
const PAPERS = [{id:"1", name:"paper one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"2", name:"paper two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"3", name:"project three", description:""}];

const ProjectPage = ({ match }) => {
  const [slider, setSlider] = useState(true);
  return(
    <div className="project-wrapper">
      <div>{match.params.id}</div>
      <div className="project-nav-link-wrapper">
        <div className="nav-link" onClick={e => {
          if(!slider) {setSlider(!slider)}
        }}>
          <Link to={match.url}>project[link]</Link>
        </div>
        <div className="nav-link" onClick={e => {
          if(slider) {setSlider(!slider)}
        }}>
          <Link to={match.url + "/search"}>search[link]</Link>
        </div>
        <Flipper flipKey={slider}>
          <Flipped flipId="underline">
            <div className={slider ? "underline underline-to-left" : "underline underline-to-right"} />
          </Flipped>
        </Flipper>
      </div>
      <Route path = {match.url + "/search"} render={() => <div>search</div>} />
    </div>        

  );
}

export default ProjectPage;