import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import ClampLines from 'react-clamp-lines';

import {projectPapersDao} from './../../dao/projectPapers.dao';
import LoadIcon from './../svg/loadIcon';

import { AppContext } from './../providers/appProvider'

/**
 * the local component that shows the papers list of a project
 */
const PapersList = (props) => {

    //bool to control the visualization of page
    const [fetching, setFetching] = useState(true);

    //get data from global context
    const appConsumer = useContext(AppContext);

    useEffect(() => {
        //a wrapper function ask by reat hook
        const fetchData = async () => {

            //call the dao
            let res = await projectPapersDao.getPapersList({project_id: props.project_id});

            //error checking
            //if is 404 error
            if(res.message == "Not Found"){
                props.setPapersList([]);
                //show the page
                setFetching(false);
            }
            //if is other error
            else if(res.message){
                //pass error object to global context
                appConsumer.setError(res);
            }
            //if res isn't null
            else if (res !== null){
                //update state
                props.setPapersList(res);
                //show the page
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

    //hide the page until to have the fetch result
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


export default PapersList;