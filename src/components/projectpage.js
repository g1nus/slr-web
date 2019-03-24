import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom'
import { Flipper, Flipped } from 'react-flip-toolkit';
import SearchForm from '../components/forms/searchform';
import { SearchResultsProvider } from "../providers/SearchResultsProvider"

//the projects will be fetched through an api
const PROJECT = {id:"1", name:"project one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "};
const PAPERS = [{id:"1", title:"paper one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"2", title:"paper two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"3", title:"paper two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}];

const ProjectPage = ({ match }) => {
  const [slider, setSlider] = useState(true);
  useEffect(() => {
    var substr = window.location.pathname.substring(window.location.pathname.length-7,window.location.pathname.length);
    if(substr === '/search' || substr === 'search/'){
      setSlider(false);
    }else{
      setSlider(true);
    }
  });
  return(
    <SearchResultsProvider><div  className="project-wrapper">
      <div className="title">PROJECT NAME</div>
      <div className="project-nav-link-wrapper">
        <div className="nav-link">
          <Link to={match.url}>papers</Link>
        </div>
        <div className="nav-link">
          <Link to={match.url + "/search"}>search</Link>
        </div>
        <Flipper flipKey={slider}>
          <Flipped flipId="underline">
            <div className={slider ? "underline underline-to-left" : "underline underline-to-right"} />
          </Flipped>
        </Flipper>
      </div>
      <Route exact path = {match.url} render={() => 
        <div className="papers-list">
          {PAPERS.map((element, index) =>
              <Link key={index} to={"#"}>
                <div  className="light-modal paper-card">
                  <h3>{element.title}</h3>
                  <p>{element.description}</p>
                </div>
              </Link>
          )}
        </div>
      } />
      <Route path = {match.url + "/search"} render={() => <SearchForm />} />
    </div></SearchResultsProvider>        

  );
}

export default ProjectPage;