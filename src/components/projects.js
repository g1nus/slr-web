import React from 'react';
import {BrowserRouter as Router, Route,} from "react-router-dom";

import ProjectsList from './projects/projectsList';
import ProjectPage from './projects/projectPage';


/**
 * this is a empty component to router projects resources
 */
const Projects = function (props) {


    return (
        <>
            <Route exact path="/projects" render={(props) => <ProjectsList {...props} />}/>
            <Route path="/projects/:id" render={(props) => <ProjectPage {...props} />}/>
        </>
    );

}

export default  Projects;