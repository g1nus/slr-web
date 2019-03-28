import React, {useState, useEffect} from "react";
import {Route, Link} from 'react-router-dom';
import {Flipper, Flipped} from 'react-flip-toolkit';
import ClampLines from 'react-clamp-lines';

import SearchForm from './../forms/searchform';
import {projectPapersDao} from './../../dao/projectPapers.dao';
import {projectsDao} from './../../dao/projects.dao';
import LoadIcon from './../svg/loadIcon';
import join from './../../utils/stringUtils';

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
    const [results, setResults] = useState([])


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

            //update only when there are the results
            if (res !== null) {
                //setPapersList(res);
                setProject(res);
                setFetching(false);
            }
        }
        fetchData();
        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectPapersDao.abortRequest();
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
                        <PapersList id={props.match.params.id} papers={papers} setPapersList={setPapersList}/>
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

/**
 * the local component that shows the papers list of a project
 */
const PapersList = (props) => {

    //bool to control the visualization of page
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        //a wrapper function ask by reat hook
        const fetchData = async () => {

            //call the dao
            let res = await projectPapersDao.getPapersList({project_id: props.id});
            //hide the page until to have the search result
            setFetching(false);

            //update only when there are the results
            if (res !== null) {
                props.setPapersList(res);
            }
        }
        fetchData();

        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectPapersDao.abortRequest();
        };
    }, []);//this way is executed only on mount

    //if the page is loading
    if (fetching) {
        //print svg image
        return <div className="papers-list"><LoadIcon></LoadIcon></div>;
    }
    //if result is empty
    else if (props.papers.length === 0) {
        return (<div className="papers-list">there are no papers here, you can add new ones by searching</div>);
    }
    else {
        return ( <PrintList papers={props.papers}/> );
    }

}


/**
 *local component to print list
 */
const PrintList = function (props) {

    return (
        <div className="papers-list">
            {props.papers.map((element, index) =>
                <div key={index} className="paper-card">
                    <Link to={"#"}><h3>{element.data.Title}</h3></Link>
                    <ClampLines
                        text={element.data.Abstract}
                        lines={4}
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

    );

}


export default ProjectPage;