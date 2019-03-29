import React, {useState, useEffect, useContext} from "react";
import {Route, Link} from 'react-router-dom';
import {Flipper, Flipped} from 'react-flip-toolkit';
import ClampLines from 'react-clamp-lines';

import SearchForm from './../forms/searchform';
import PapersList from './papersList';
import {projectsDao} from './../../dao/projects.dao';
import LoadIcon from './../svg/loadIcon';
import join from './../../utils/stringUtils';

import { AppContext } from './../../providers/appProvider'

const OPTIONS1 = ["option one", "option two", "option three"];


/**
 *this component will show a projects page
 */
const ProjectPage = (props) => {

    //project object of page
    const [project, setProject] = useState({});
    //papers list of project
    const [papers, setPapersList] = useState([]);
    //bool to control the visualization of page
    const [fetching, setFetching] = useState(true);
    //bool for annimation
    const [slider, setSlider] = useState(true);
    //research query
    const [query, setQuery] = useState('');
    //selected list of papers
    const [selectedpapers, setSelectedPapers] = useState([]);
    //options on search
    const [checkboxes, setCheckboxes] = useState({
        one: OPTIONS1.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
            {}
        )
    });
    //search result
    const [results, setResults] = useState([]);

    //get data from global context
    const appConsumer = useContext(AppContext);


    useEffect(() => {

        //set animation effects on menu by parsing the url
        var substr = window.location.pathname.substring(window.location.pathname.length - 7, window.location.pathname.length);
        if (substr === '/search' || substr === 'search/') {
            setSlider(false);
        }
        else {
            setSlider(true);
        }
    });

    useEffect(() => {

        //a wrapper function ask by reat hook
        const fetchData = async () => {

            //call the dao
            let res = await projectsDao.getProject(props.match.params.id);

            //error checking
            //if is other error
             if(res.message){
                //pass error object to global context
                appConsumer.setError(res);
            }
            //if res isn't null
            else if (res !== null){
                //update state
                 setProject(res);
                 //show the page
                 setFetching(false);
            }
        }
        fetchData();
        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectsDao.abortRequest();
        };
    }, []);//this way is executed only on mount

    //if the page is loading
    if (fetching) {
        //print svg image
        return <LoadIcon></LoadIcon>;
    }
    else {
        return (

            <div className="project-wrapper">
                <div className="title">{project.data.name.toUpperCase()}</div>
                <div className="project-nav-link-wrapper">
                    <div className="nav-link">
                        <Link to={props.match.url}>papers</Link>
                    </div>
                    <div className="nav-link">
                        <Link to={join(props.match.url, "/search")}>search</Link>
                    </div>
                    <Flipper flipKey={slider}>
                        <Flipped flipId="underline">
                            <div className={slider ? "underline underline-to-left" : "underline underline-to-right"}/>
                        </Flipped>
                    </Flipper>
                </div>

                {/*print the papers list*/}
                <Route exact path={props.match.url} render={() =>
                    <>
                        <div className="project-description">{project.data.description}</div>
                        <PapersList project_id={props.match.params.id} papers={papers} setPapersList={setPapersList}/>
                    </>
                }/>

                {/*print the form of search*/}
                <Route path={props.match.url + "/search"} render={() =>
                    <SearchForm projectId={project.id} query={query} setQuery={setQuery}
                                checkboxes={checkboxes} setCheckboxes={setCheckboxes}
                                results={results} setResults={setResults}
                                selectedpapers={selectedpapers} setSelectedPapers={setSelectedPapers}/>
                }/>

            </div>
        );
    }
}


export default ProjectPage;