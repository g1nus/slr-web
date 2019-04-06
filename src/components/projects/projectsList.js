import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import queryString from 'query-string';


import {projectsDao} from 'src/dao/projects.dao';
import LoadIcon from 'src/components/svg/loadIcon';
import ProjectForm from 'src/components/forms/projectForm';
import Pagination from 'src/components/modules/pagination';
import {join} from 'src/utils/index';
import Cover from 'src/components/modules/cover';
import SideOptions from 'src/components/modules/sideOptions';

import {AppContext} from "src/components/providers/appProvider";

/**
 *this component will show a projects list page
 */

const ProjectsList = function (props) {


    //fetch data
    const [projectsList, setProjectsList] = useState([]);

    //bool to show the pagination buttons
    const initialPaginationState = {hasbefore: false, continues: false};
    const [pagination, setPagination] = useState(initialPaginationState);

    //bool to control the visualization of page
    const [display, setDisplay] = useState(false);

    //bool to control the visualization of input form
    const [toggleform, setToggleForm] = useState(false);

    //get data from global context
    const appConsumer = useContext(AppContext);

    //set query params from url
    const params = queryString.parse( props.location.search && props.location.search);
    const pagesize = params.pagesize || 10;
    const before = params.before || -1;
    const after = params.after || 0;

    //if "before" is defined by query then insert it in object, else insert "after" in object
    const queryData = (before >= 0 ? {pagesize, before} : {pagesize, after});

    //set title when component mounts
    useEffect(() => {
        appConsumer.setTitle(<div className="nav-elements"> <h2 className="static-title">PROJECTS</h2> </div>);
    },[])//run on component mount

    useEffect(() => {


        //a wrapper function ask by react hook
        const fetchData = async () => {
            //hide the page
            setDisplay(false);

            //call the dao
            const res = await projectsDao.getProjectsList(queryData);

            //error checking
            //if is 404 error
            if (res.message === "Not Found") {
                setProjectsList([]);
                setPagination(initialPaginationState);
                //show the page
                setDisplay(true);
            }
            //if is other error
            else if (res.message) {
                //pass error object to global context
                appConsumer.setError(res);
            }
            //if res isn't null
            else if (res !== null) {
                //update state

                //I put even first and then odd ones so I can display 2 columns with left-right flow 
                var even_projs = [];
                even_projs = res.results.filter(function(element){ if( element.id % 2 ) return element;});
                var odd_projs = [];
                odd_projs = res.results.filter(function(element){ if( !(element.id % 2) ) return element;});

                setProjectsList(even_projs.concat(odd_projs));
                setPagination({hasbefore: res.hasbefore, continues: res.continues});
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
    }, [pagesize, before, after]); //re-execute when these variables change

    let output;
    //if the page is loading
    if (display === false) {
        //print svg image
        output = <LoadIcon/>;
    }

    else {

        //get first and last project id of list
        let firstId = 0;
        let lastId = 0;
        //if the list is not empty
        if (projectsList.length > 0) {
            firstId = projectsList[0].id;
            lastId = projectsList[projectsList.length - 1].id;
        }
        output = (
            <div>
                <Cover cls={toggleform ? "full-screen" : ""} handler={setToggleForm}/>
                {/*print list of projects*/}
                <PrintList projectsList={projectsList} path={props.match.url}/>
                {/*set listId and continues value*/}
                <Pagination before={firstId} after={lastId} pagination={pagination} path={props.match.url+"?"}/>

                {/*print the input form to create/update the projects*/}
                <ProjectForm visibility={toggleform} setVisibility={setToggleForm} history={props.history}/>
                {/*button to show input form*/}
                <button className="bottom-left-btn" type="button" value="toggle-insert-form" onClick={(e) => {
                    setToggleForm(!toggleform);
                }}>+
                </button>
            </div>
        );

    }

    return output;


};


/**
 *  local component to print list
 * @param projectsList projects list data
 * @param path current page url
 */
const PrintList = function ({projectsList, path}) {

    //get data from global context
    const appConsumer = useContext(AppContext);

    let sideOptions= ["delete"];

    function handleDelete(id){
        console.log("deleting " + id);
        const deleteData = async () => {

            //call the dao
            let res = await projectsDao.deleteProject(id);

            //error checking
            //if is other error
            if (res.message) {
                //pass error object to global context
                appConsumer.setError(res);
            }
            //if res isn't null
            else if (res !== null) {
                console.log("DELETED SUCCESFULLY!")
            }
        }

        deleteData();
    }

    let maps;
    //if list is empty, print a notice message
    if (projectsList.length === 0) {
        maps = (
            <div>there aren't projects</div>
        );
    }
    //if list isn't empty, print list of projects
    else {
        maps = (projectsList.map((element, index) =>
                <div key={element.id} className="light-modal project-card">
                    <SideOptions options={sideOptions} handler={handleDelete} target={element.id} cls="project-card-options"/>
                    <Link to={join(path, "/" + element.id)}>
                        <h3>{element.id} {element.data.name}</h3>
                        <p>{element.data.description}</p>
                    </Link>
                </div>
        ));
    }

    let output =  (
        <div className="project-cards-holder">
            {maps}
        </div>
    );

    return output;

};


export default ProjectsList;