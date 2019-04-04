import React, {useState, useEffect, useContext} from "react";
import queryString from "query-string";

import {projectPapersDao} from 'src/dao/projectPapers.dao';
import LoadIcon from 'src/components/svg/loadIcon';
import {PrintList} from 'src/components/papers/printPapersList';

import {AppContext} from 'src/components/providers/appProvider'
import {join} from "src/utils";
import Pagination from "src/components/modules/pagination";


/**
 * the local component that shows the papers list of a project
 */
const PapersList = ({project_id, location, match}) => {


    //fetch data
    const [papersList, setPapersList] = useState([]);

    //bool to show the pagination buttons
    const initialPaginationState = {hasbefore: false, continues: false};
    const [pagination, setPagination] = useState(initialPaginationState);

    //bool to control the visualization of page
    const [display, setDisplay] = useState(false);

    //get data from global context
    const appConsumer = useContext(AppContext);

    //set query params from url
    const params = queryString.parse(location.search);
    const pagesize = params.pagesize || 10;
    const before = params.before || -1;
    const after = params.after || 0;

    //if "before" is defined by query then insert it in object, else insert "after" in object
    const queryData = (before >= 0 ? {pagesize, before} : {pagesize, after});
    //insert project_id in queryData
    queryData.project_id = project_id;

    useEffect(() => {

        //a wrapper function ask by react hook
        const fetchData = async () => {
            //hide the page
            setDisplay(false);

            //call the dao
            let res = await projectPapersDao.getPapersList(queryData);

            //error checking
            //if is 404 error
            if (res.message === "Not Found") {
                setPapersList([]);
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
                setPapersList(res.results);
                setPagination({hasbefore: res.hasbefore, continues: res.continues});
                //show the page
                setDisplay(true);
            }

        }
        fetchData();

        //when the component will unmount
        return () => {
            //stop all ongoing request
            projectPapersDao.abortRequest();
        };
    }, [pagesize, before, after]); //re-excute when these variables change

    let output;
    //if the page is loading
    if (display === false) {
        //print svg image
        output = <LoadIcon class={"small"}/>;
    }
    else {

        //get first and last paper id of list
        let firstId = 0;
        let lastId = 0;
        //if the list is not empty
        if (papersList.length > 0) {
            firstId = papersList[0].id;
            lastId = papersList[papersList.length - 1].id;
        }

        output = (
            <div className="paper-card-holder">
                <PrintList papersList={papersList}/>
                <Pagination before={firstId} after={lastId} pagination={pagination} path={match.url+"?"}/>
            </div>
        );
    }

    output = (
        <div className="papers-list">
            {output}
        </div>
    );

    return output;

}



export default PapersList;