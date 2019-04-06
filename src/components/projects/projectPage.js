import React, {useState, useEffect, useContext} from "react";
import {Route, Link} from 'react-router-dom';
import {Flipper, Flipped} from 'react-flip-toolkit';

import SearchForm from 'src/components/forms/searchform';
import PapersList from 'src/components/papers/papersList';
import {projectsDao} from 'src/dao/projects.dao';
import LoadIcon from 'src/components/svg/loadIcon';
import ProjectDescription from 'src/components/projects/projectDescription'
import {join} from 'src/utils/index';

import {AppContext} from 'src/components/providers/appProvider'


/**
 *this component will show a projects page
 */
const ProjectPage = (props) => {

    //project object of page
    const [project, setProject] = useState({});

    //bool to control the visualization of page
    const [display, setDisplay] = useState(false);
    //bool for annimation
    const [slider, setSlider] = useState(true);

    //get data from global context
    const appConsumer = useContext(AppContext);

    const project_id = props.match.params.id;

    const substrUrl = window.location.pathname.substring(window.location.pathname.length - 7, window.location.pathname.length);

    //set animation effects on menu by parsing the url
    useEffect(() => {

        if (substrUrl === '/search' || substrUrl === 'search/') {
            setSlider(false);
        }
        else {
            setSlider(true);
        }
    }, [substrUrl]);


    useEffect(() => {

        setDisplay(false);
        //a wrapper function ask by react hook
        const fetchData = async () => {

            //call the dao
            let res = await projectsDao.getProject(project_id);

            //error checking
            //if is other error
            if (res.message) {
                //pass error object to global context
                appConsumer.setError(res);
            }
            //if res isn't null
            else if (res !== null) {
                //update state
                setProject(res);
                //show the page
                setDisplay(true);
            }
        }
        fetchData();
        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectsDao.abortRequest();
        };
    }, [project_id]); //re-execute when these variables change

    async function updateDescription(e){
        console.log("UPDATING");
    }

    let output;

    //if the page is loading
    if (display === false) {
        //print svg image
        output = <LoadIcon/>;
    }
    else {
        appConsumer.setTitle(project.data.name.toUpperCase());//I set the page title
        output = (

            <div className="project-wrapper">
                <ProjectPageHead project={project} match={props.match} slider={slider}/>

                {/*route the papers list*/}
                <Route exact  path={props.match.url} render={() =>
                    <>
                        <ProjectDescription description={project.data.description} update={updateDescription}/>
                        <PapersList project_id={project_id} location={props.location} match={props.match} />
                    </>
                }/>

                {/*route the form of search*/}
                <Route exact path={props.match.url + "/search"} render={(props) =>
                    <SearchForm project_id={project_id} {...props} />
                }/>

            </div>
        );
    }

    return output;
}

/**
 * this is the local component to print head of project page
 */
const ProjectPageHead = function ({project, match, slider}) {
    let output = (
        <>
            <div className="project-nav-link-wrapper">
                <div className="nav-link">
                    <Link to={match.url}>papers</Link>
                </div>
                <div className="nav-link">
                    <Link to={join(match.url, "/search")}>search</Link>
                </div>
                <Flipper flipKey={slider}>
                    <Flipped flipId="underline">
                        <div className={slider ? "underline underline-to-left" : "underline underline-to-right"}/>
                    </Flipped>
                </Flipper>
            </div>
        </>
    );
    return output;

}


export default ProjectPage;