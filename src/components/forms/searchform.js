import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import ClampLines from 'react-clamp-lines';
import queryString from "query-string";


import CheckBox from "./checkbox";
import {paperDao} from './../../dao/paper.dao';
import {projectPapersDao} from './../../dao/projectPapers.dao'
import LoadIcon from './../svg/loadIcon';
import SearchButton from './../svg/searchButton';
import {join} from './../../utils/index';

import {AppContext} from './../providers/appProvider'
import Pagination from "./../modules/pagination";


/*this is component form to search for the paper in project page*/

const SearchForm = function ({project_id, location, match, history}) {



    //fetch data
    const [papersList, setPapersList] = useState([]);

    //options on search
    const initialCheckboxesState = {option1: false, option2: false, option3: false};
    const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

    //selected list of papers
    const [selectedPapers, setSelectedPapers] = useState([]);

    //input search string
    const [inputToSearch, setInputToSearch] = useState('');

    //bool to control the visualization of page
    const [display, setDisplay] = useState(true);

    //bool to show the pagination buttons
    const initialPaginationState = {hasbefore: false, continues: false};
    const [pagination, setPagination] = useState(initialPaginationState);

    //get data from global context
    const appConsumer = useContext(AppContext);


    //set query params from url
    const params = queryString.parse(location.search);
    const pagesize = params.pagesize || 10;
    const before = params.before || -1;
    const after = params.after || 0;
    const query = params.query || "";
    const option1 = params.option1 || false;
    const option2 = params.option2 || false;
    const option3 = params.option3 || false;
    const queryData = {pagesize, query};
    if (before >= 0) {
        queryData.before = before;
    }
    else {
        queryData.after = after;
    }
    if (option1) {
        queryData.option1 = option1;
    }
    if (option2) {
        queryData.option2 = option2;
    }
    if (option3) {
        queryData.option3 = option3;
    }



    useEffect(() => {


        //a wrapper function ask by react hook
        const fetchData = async () => {

            //empty the list
            setSelectedPapers([]);


            //if there is queryString from URL
            if (query !== "") {

                //hide the page
                setDisplay(false);
                //call the dao
                let res = await paperDao.search(queryData);

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

        }

        fetchData();

    }, [query, before, after, option1, option2, option3, project_id]);  //re-execute when these variables change

    /**
     * update the checkbox state
     */
    function handleCheckboxChange(e) {
        //copy the object
        let newState = {...checkboxes};
        let optionName = e.target.name;
        switch (optionName) {
            case "option1":
                newState.option1 = !newState.option1;
                break;
            case "option2":
                newState.option2 = !newState.option2;
                break;
            case "option3":
                newState.option3 = !newState.option3;
                break;
        }
        setCheckboxes(newState);
    }

    /*function to insert and remove the paper id from selected list*/
    function handlePaperSelection(event) {
        let id = event.target.value;
        //if id is not included in the list yet
        if (!selectedPapers.includes(id)) {
            //copy array
            let array = [...selectedPapers];
            array.push(id);

            //update the state
            setSelectedPapers(array);
        }
        //if id already exists in the list
        else {
            //create a new array without the target paper id
            var array = selectedPapers.filter(function (value) {
                return value !== id;
            });
            setSelectedPapers(array);
        }
    }

    /*function to add the post in the project*/
    async function handleAddPapers(event) {

        event.preventDefault();
        //hide the page
        setDisplay(false);

        //for to insert papers into DB
        for (let i = 0; i < selectedPapers.length; i++) {

            //call dao
            let res = await projectPapersDao.postPaperIntoProject({
                paper_id: selectedPapers[i], project_id: project_id
            });
            //if there is the error
            if (res.message) {
                //pass error object to global context
                appConsumer.setError(res);
                return null;
            }
        }
        //show the page
        setDisplay(true);

        //alert("insert completed");
    }


    /*function to send the query*/
    async function handleSendSearch(event) {

        event.preventDefault();
        //if query input is empty
        if (inputToSearch === "") {
            alert("search string is empty")
        }
        else {
            //concatenate the query string
            let queryParams = "?query=" + inputToSearch;
            if (checkboxes.option1) {
                queryParams += "&option1=true";
            }
            if (checkboxes.option2) {
                queryParams += "&option2=true";
            }
            if (checkboxes.option3) {
                queryParams += "&option3=true";
            }

            //update url to start the search
            history.push(queryParams);
        }

    }

    /*
     #######################################
     need to  create a new child component for the part of <form>, when we have more information on search options
     ######################################
     */
    let formPart = (
        <>{}
            <form className={(query === "") ? 'search-form' : 'search-form small'}
                  onSubmit={handleSendSearch}>
                {/*search form*/}
                <div style={{position: 'relative'}}>
                    <input
                        type="text"
                        placeholder="search"
                        defaultValue={inputToSearch}
                        onChange={e => setInputToSearch(e.target.value)}
                    />
                    <button type="submit" value="Submit">
                        <SearchButton/>
                    </button>
                </div>

                <div className="option-holder">
                    <label>Option:</label><br/>
                    <div className="checkboxes-holder">

                        <CheckBox label="option1" isChecked={checkboxes.option1} handler={handleCheckboxChange}/>
                        <CheckBox label="option2" isChecked={checkboxes.option2} handler={handleCheckboxChange}/>
                        <CheckBox label="option3" isChecked={checkboxes.option3} handler={handleCheckboxChange}/>

                    </div>
                </div>

            </form>
        </>);


    let resultPart="";

    //if is loading
    if (display === false) {

        resultPart = (
            <div className="loading-holder">
                <LoadIcon/>
            </div>);
    }
    //if the search results list is empty
    if (papersList.length === 0 && query !== "") {
        resultPart = (
            <div> not found :( </div>
        );
    }
    else if(papersList.length > 0 &&query !== ""){

        //get first and last paper id of list
        let firstId = papersList[0].id;
        let lastId = papersList[papersList.length - 1].id;

        //set correct url for pagination
        let paginationUrl = window.location.href;
        let index = paginationUrl.indexOf("?");
        let existBefore = paginationUrl.lastIndexOf("before");
        let existOfAfter = paginationUrl.lastIndexOf("after");
        if(existBefore > -1){
            paginationUrl = paginationUrl.slice(index, existBefore)
        }
        else if(existOfAfter > -1){
            paginationUrl = paginationUrl.slice(index, existOfAfter)
        }
        else{
            paginationUrl = paginationUrl.slice(index) +"&";
        }


        resultPart = (
            <>
                <PrintSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>
                <Pagination before={firstId} after={lastId} pagination={pagination} path={paginationUrl}/>
                <button className="bottom-left-btn" type="submit" value="Submit">
                    +
                </button>
            </>
        );
    }

    let output = (
        <>
            {formPart}
            <form className="search-results" onSubmit={handleAddPapers}>
                {resultPart}
            </form>
        </>
    );

    return output;
}


/*local component to print search result list of papers*/
const PrintSearchList = function ({papersList, handlePaperSelection}) {

    let output = papersList.map((element, index) =>
        <div key={element.id} className="paper-card">
            <CheckBox val={element.id} label={""} handler={handlePaperSelection}/>
            <Link to={"#"}><h3>{element.id} {element.data.Title}</h3></Link>
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
    );
    return output;

}


export default SearchForm;