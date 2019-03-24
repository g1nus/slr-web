import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import { Flipper, Flipped } from 'react-flip-toolkit';
import SearchForm from '../components/forms/searchform';
import {projectPapersDao} from '../dao/projectPapers.dao';
import {projectsDao} from '../dao/projects.dao';
import LoadIcon from '../components/loadicon';
import ClampLines from 'react-clamp-lines';

const OPTIONS1 = ["option one", "option two", "option three"];

const ProjectPage = ({ match }) => {
  const [papers, setPapersList] = useState([]);
  const [project, setProject] = useState({});
  const [fetching, setFetching] = useState(true);
  const [slider, setSlider] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedpapers, setSelectedPapers] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    one: OPTIONS1.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  });
  const [results, setResults] = useState([])

  useEffect(() => {
    var substr = window.location.pathname.substring(window.location.pathname.length-7,window.location.pathname.length);
    if(substr === '/search' || substr === 'search/'){
      setSlider(false);
    }else{
      setSlider(true);
    }
  });

  useEffect(() => {
    //a wrapper function ask by reat hook
    const fetchData = async () => {
      //call the dao
      let res = await projectPapersDao.getPapersList({project_id : match.params.id});
      //update state
      setPapersList(res);
      res = await projectsDao.getProject(match.params.id);
      setProject(res);
      setFetching(false);
    }
    fetchData();
    //when the component will unmount
    return () => {
        //stop all ongoing request
        projectPapersDao.abortRequest();
    };
  }, []);//this way is executed only on mount
  
  if(fetching){
    return <LoadIcon></LoadIcon>;
  }else{
  return(
    <div  className="project-wrapper">
      <div className="title">{project.data.name.toUpperCase()}</div>
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
        <>
        <div className="project-description">{project.data.description}</div>
        <div className="papers-list">
          {papers.map((element, index) =>
                <div key={index} className="paper-card">
                  <Link to={"#"}><h3>{element.data.Title}</h3></Link>
                  <ClampLines
                    text={element.data.Abstract}
                    lines= {4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    className="paragraph"
                    moreText="more"
                    lessText="less"
                  />
                </div>
              
          )}
        </div>
        </>
      } />
      <Route path = {match.url + "/search"} render={() => 
        <SearchForm projectId={project.id} query={query} setQuery={setQuery} 
        checkboxes={checkboxes} setCheckboxes={setCheckboxes} 
        results={results} setResults={setResults}
        selectedpapers={selectedpapers} setSelectedPapers={setSelectedPapers}/>
      } />
    </div>

  );
    }
}

export default ProjectPage;