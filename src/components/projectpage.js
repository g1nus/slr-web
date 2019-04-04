import React, {useState, useEffect} from "react";
import {Route, Link} from 'react-router-dom';
import {Flipper, Flipped} from 'react-flip-toolkit';
import SearchForm from 'src/components/forms/searchform';
import {projectPapersDao} from 'src/dao/projectPapers.dao';
import {projectsDao} from 'src/dao/projects.dao';
import LoadIcon from 'src/components/loadicon';
import ClampLines from 'react-clamp-lines';
import join from 'src/utils/stringUtils';

const OPTIONS1 = ["option one", "option two", "option three"];

const PapersList = ({id, papers, setPapersList}) => {
    const [fetching, setFetching] = useState(true);
    useEffect(() => {
        //a wrapper function ask by reat hook
        const fetchData = async () => {

            //call the dao
            let res = await projectPapersDao.getPapersList({project_id: id});
            //let res2 = await projectsDao.getProject(match.params.id);
            console.log(res);
            setFetching(false);
            //update only when there are the results
            if (res !== null /*&& res2 !== null*/) {
                setPapersList(res);
                //setProject(res2);
            }
        }
        fetchData();
        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectPapersDao.abortRequest();
        };
    }, []);//this way is executed only on mount
    if (fetching) {
        return <div className="papers-list"><LoadIcon></LoadIcon></div>;
    }else {
        if(papers.length === 0){
            return <div className="papers-list">there are no papers here, you can add new ones by searching</div>;
        }else{
            return(
                <div className="papers-list">
                    {papers.map((element, index) =>
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
    }
}

const ProjectPage = ({match}) => {
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
            //let res = await projectPapersDao.getPapersList({project_id: match.params.id});
            let res2 = await projectsDao.getProject(match.params.id);

            //update only when there are the results
            if (/*res !== null && */res2 !== null) {
                //setPapersList(res);
                setProject(res2);
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

    if (fetching) {
        return <LoadIcon></LoadIcon>;
    }
    else {
        return (
            <div className="project-wrapper">
                <div className="title">{project.data.name.toUpperCase()}</div>
                <div className="project-nav-link-wrapper">
                    <div className="nav-link">
                        <Link to={match.url}>papers</Link>
                    </div>
                    <div className="nav-link">
                        <Link to={join(match.url,"/search")}>search</Link>
                    </div>
                    <Flipper flipKey={slider}>
                        <Flipped flipId="underline">
                            <div className={slider ? "underline underline-to-left" : "underline underline-to-right"}/>
                        </Flipped>
                    </Flipper>
                </div>
                <Route exact path={match.url} render={() =>
                    <>
                        <div className="project-description">{project.data.description}</div>
                        <PapersList id={match.params.id} papers={papers} setPapersList={setPapersList}/>
                    </>
                }/>
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