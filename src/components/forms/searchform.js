import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import ClampLines from 'react-clamp-lines';
import queryString from "query-string";


import CheckBox from "./checkbox";
import {paperDao} from './../../dao/paper.dao';
import {projectPapersDao} from './../../dao/projectPapers.dao'
import LoadIcon from './../svg/loadIcon';
import SearchButton from './../svg/searchButton';
import {searchCheckboxesToParams, join} from './../../utils/index';
import {PrintLocalSearchList, PrintScoupusSearchList} from './../papers/printPapersList';

import {AppContext} from './../providers/appProvider'
import Pagination from "./../modules/pagination";

// Load the lodash build
var _ = require('lodash');

/*this is component form to search for the paper in project page*/

const SearchForm = function ({project_id, location, match, history}) {
    
    //default searchby options(used for avoiding user errors)
    const sbyOptions = ["all", "author", "paperTitle"];
    //default year options
    const yearOptions = _.range(2017,2020).map(String);//it will be more useful once there will be multiple years
    //set query params from url
    const params = queryString.parse(location.search);
    const pagesize = params.pagesize || 10;
    const before = params.before || -1;
    const after = params.after || 0;
    const query = params.query || "";
    //query params flags(I don't send errors if the user adds a value different from the default ones)
    const scopus = (params.scopus === 'false') ? false : Boolean(params.scopus || false);
    const googleScholar = (params.scopus === 'false') ? false : Boolean(params.googleScholar || false);
    const arXiv = (params.scopus === 'false') ? false : Boolean(params.arXiv || false);
    let searchby = params.searchby;
    if(!sbyOptions.includes(searchby)){//if the value in input doesn't exists as default one I select 'all'
        searchby = "all";
    }
    let years = (params.years || "").split(",");
    if(years[0] === ""){
        years = [];
    }

    //options on search
    const initialCheckboxesState = {"scopus": scopus, "googleScholar": googleScholar, "arXiv": arXiv, //source
                                    "all": (searchby === "all"), "author": (searchby === "author"), "paperTitle": (searchby === "paperTitle"), //searchby
                                    "years": years};//year
    const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

    //fetch data
    const [papersList, setPapersList] = useState([]);

    //selected list of papers
    const [selectedPapers, setSelectedPapers] = useState([]);

    //input search string
    const [inputToSearch, setInputToSearch] = useState(query);

    //bool to control the visualization of page
    const [display, setDisplay] = useState(true);

    //bool to show the pagination buttons
    const initialPaginationState = {hasbefore: false, continues: false};
    const [pagination, setPagination] = useState(initialPaginationState);

    //get data from global context
    const appConsumer = useContext(AppContext);


    const queryData = {pagesize, query};
    if (before >= 0) {
        queryData.before = before;
    }
    else {
        queryData.after = after;
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

                let res;
                //call the dao to get local papers
                if(scopus === false || scopus){
                    res = await paperDao.search(queryData);
                }
                //call to dao to get scopus papers
                else{
                    res = await paperDao.scopusSearch(queryData);
                }


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

    }, [query, before, after, scopus, googleScholar, arXiv, project_id]);  //re-execute when these variables change

    /**
     * update the checkbox state
     */
    function handleCheckboxChange(e) {
        //copy the object
        let newState = {...checkboxes};
        let optionName = e.target.value;
        if(yearOptions.includes(optionName)){//if it's an year option
            if (!checkboxes.years.includes(optionName)) {//I check whether the year wasn't selected
                newState.years.push(optionName);
            }else{
                var array = checkboxes.years.filter(function (value) {
                    return value !== optionName;
                });
                newState.years = array;
            }
        }else{
            newState[optionName] = !checkboxes[optionName];
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

        alert("insert completed");
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
            queryParams += searchCheckboxesToParams(checkboxes);

            //update url to start the search
            history.push(queryParams);
        }

    }

    /*
     #######################################
     need to  create a new child component for the part of <form>, when we have more information on search options
     ######################################
     */
    let formPart = (//creare un componente a part
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
                    <label>Source:</label><br/>
                    <div className="checkboxes-holder">

                        <CheckBox label="Scopus" value="scopus" isChecked={checkboxes.scopus} handler={handleCheckboxChange}/>
                        <CheckBox label="Google Scholar" value="googleScholar" isChecked={checkboxes.googleScholar} handler={handleCheckboxChange}/>
                        <CheckBox label="arXiv" value="arXiv" isChecked={checkboxes.arXiv} handler={handleCheckboxChange}/>
                    </div>

                    <label>Search by:</label><br/>
                    <div className="checkboxes-holder">

                        <CheckBox label="All" value="all" isChecked={checkboxes.all} handler={handleCheckboxChange}/>
                        <CheckBox label="Author" value="author" isChecked={checkboxes.author} handler={handleCheckboxChange}/>
                        <CheckBox label="Paper title" value="paperTitle" isChecked={checkboxes.paperTitle} handler={handleCheckboxChange}/>

                    </div>

                    <label>Year:</label><br/>
                    <div className="checkboxes-holder">

                        <CheckBox label="2019" value="2019" isChecked={checkboxes.years.includes("2019")} handler={handleCheckboxChange}/>
                        <CheckBox label="2018" value="2018" isChecked={checkboxes.years.includes("2018")} handler={handleCheckboxChange}/>
                        <CheckBox label="2017" value="2017" isChecked={checkboxes.years.includes("2017")} handler={handleCheckboxChange}/>

                    </div>
                </div>

            </form>
        </>);


    let resultPart="";

    //if the search results list is empty
    if (display === true && papersList.length === 0 && query !== "") {
        //the class is used only to workaround a small bug that display not found just as the search start before the loading icon
        resultPart = (
            <div className="not-found"> not found :( </div> 
        );
    }
    else if(papersList.length > 0 && query !== ""){

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

        let printList = (scopus === false?
                (<PrintLocalSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>)
                :
                (<PrintLocalSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>)//( <PrintScoupusSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>)
        );


        resultPart = (
            <div className="paper-card-holder">
                {printList}
                <Pagination before={firstId} after={lastId} pagination={pagination} path={paginationUrl}/>
                <button className="bottom-left-btn" type="submit" value="Submit">
                    +
                </button>
            </div>
        );
    }

    //if is loading
    if (display === false) {

        resultPart = (
            <div className="search-loading-holder">
                <LoadIcon class={"small"}/>
            </div>);
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
};




export default SearchForm;