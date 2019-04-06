import React, {useState, useEffect, useContext} from "react";
import queryString from "query-string";

import {projectPapersDao} from 'src/dao/projectPapers.dao';
import LoadIcon from 'src/components/svg/loadIcon';
import {PrintList} from 'src/components/papers/printPapersList';
import Select from 'src/components/forms/select';
import OrderArrow from 'src/components/svg/orderArrow';

import {AppContext} from 'src/components/providers/appProvider'
import {join} from "src/utils";
import Pagination from "src/components/modules/pagination";

//order options
const options = [
    { value: 'eid', label: 'EID' },
    { value: 'title', label: 'Title' },
    { value: 'authors', label: 'Authors' }
  ];

/**
 * the local component that shows the papers list of a project
 */
const PapersList = ({project_id, location, match}) => {


    //fetch data
    const [papersList, setPapersList] = useState([]);

    //ordering components
    const [orderBy, setOrderBy] = useState(0);//the number index of the options array
    const [sort, setSort] = useState(true);//true means "asc"

    //bool to show the pagination buttons
    const initialPaginationState = {hasbefore: false, continues: false};
    const [pagination, setPagination] = useState(initialPaginationState);

    //bool to control the visualization of page
    const [display, setDisplay] = useState(false);

    //get data from global context
    const appConsumer = useContext(AppContext);

    //set query params from url
    const params = queryString.parse(location.search);
    const count = params.count || 10;
    const start = params.start || 0;

    //if "before" is defined by query then insert it in object, else insert "after" in object
    const queryData = {project_id, start, count, orderBy: options[orderBy].value, sort: (sort) ? "ASC" : "DESC"};


    //handler for sort selection(ID|last modified|title)
    function handleSelection(e){
        setOrderBy(parseInt(e.target.getAttribute('data-value')));
    }

    //handler for order slection(ASC|DESC)
    function handelOrder(e){
        document.getElementById("ani-order-arrow").beginElement();//trigger svg animation
        setSort(!sort);
    }

    useEffect(() => {

        //a wrapper function ask by react hook
        const fetchData = async () => {
            //hide the page
            setDisplay(false);
            console.log(queryData);
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
                //setPagination({hasbefore: res.hasbefore, continues: res.continues});
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
    }, [sort, orderBy, start, count]); //re-excute when these variables change

    let output;
    //if the page is loading
    if (display === false) {
        //print loading image
        output = (
            <div className="paper-card-holder">
                <div className="order" style={{pointerEvents: "none"}}>{/* this way the user cannot sort while loading the results */}
                    <label>sort by:</label>
                    <Select options={options} selected={orderBy} handler={handleSelection}/>
                    <button type="button" onClick={handelOrder}><OrderArrow up={(sort)}/></button>
                </div>
                <LoadIcon class={"small"}/>
            </div> );
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
                <div className="order">
                    <label>sort by:</label>
                    <Select options={options} selected={orderBy} handler={handleSelection}/>
                    <button type="button" onClick={handelOrder}><OrderArrow up={(sort)}/></button>
                </div>
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