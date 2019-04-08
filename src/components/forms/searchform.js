import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import ClampLines from 'react-clamp-lines';
import queryString from "query-string";


import CheckBox from "src/components/forms/checkbox";
import {paperDao} from 'src/dao/paper.dao';
import {projectPapersDao} from 'src/dao/projectPapers.dao'
import LoadIcon from 'src/components/svg/loadIcon';
import SearchButton from 'src/components/svg/searchButton';
import {searchCheckboxesToParams, join} from 'src/utils/index';
import {PrintLocalSearchList, PrintScoupusSearchList} from 'src/components/papers/printPapersList';
import Select from 'src/components/forms/select';
import OrderArrow from 'src/components/svg/orderArrow';

import {AppContext} from 'src/components/providers/appProvider'
import Pagination from "src/components/modules/pagination";

// Load the lodash build
var _ = require('lodash');

//order options
const options = [
    { value: 'title', label: 'Title' },
    { value: 'date', label: 'Date' }
  ];

/*this is component form to search for the paper in project page*/

const SearchForm = function ({project_id, location, match, history}) {
    
    //ordering components
    const [orderBy, setOrderBy] = useState(0);//the number index of the options array
    const [sort, setSort] = useState(true);//true means "asc"

    //handler for sort selection(ID|last modified|title)
    function handleSelection(e){
        setOrderBy(parseInt(e.target.getAttribute('data-value')));
    }

    //handler for order slection(ASC|DESC)
    function handelOrder(e){
        document.getElementById("ani-order-arrow").beginElement();//trigger svg animation
        setSort(!sort);
    }

    //default searchby options(used for avoiding user errors)
    const sbyOptions = ["all", "author", "paperTitle"];
    //default year options
    const yearOptions = _.range(2017,2020).map(String);//it will be more useful once there will be multiple years
    //set query params from url
    const params = queryString.parse(location.search);
    const count = params.count || 10;
    const start = params.start || 0;
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

    //bool to show the pagination list
    const [totalResults, setTotalResults] = useState(0);

    //get data from global context
    const appConsumer = useContext(AppContext);


    const queryData = {query, start, count, orderBy: options[orderBy].value, sort: (sort) ? "ASC" : "DESC"};


    useEffect(() => {


        //a wrapper function ask by react hook
        const fetchData = async () => {

            //empty the list
            setSelectedPapers([]);


            //if there is queryString from URL
            if (query !== "") {

                //hide the page
                setDisplay(false);
                console.log(queryData);
                let res;
                
                //always call the dao to search on scopus
                res = await paperDao.search(queryData);


                //error checking
                //if is 404 error
                if (res.message === "Not Found") {
                    setPapersList([]);
                    setTotalResults(0);
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
                    setTotalResults(res.totalResults);
                    //show the page
                    setDisplay(true);
                }
            }

        };

        fetchData();

    }, [start, count, sort, orderBy, query, scopus, googleScholar, arXiv, project_id]);  //re-execute when these variables change

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
        //setDisplay(false);
        console.log(selectedPapers);
        //for to insert papers into DB
        
        //call dao
        let res = await projectPapersDao.postPaperIntoProject({
            arrayEid: selectedPapers, project_id: project_id
        });
        //if there is the error
        if (res.message) {
            //pass error object to global context
            appConsumer.setError(res);
            return null;
        }

        //show the page
        //setDisplay(true);

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
            let queryParams = "?query=" + encodeURIComponent(inputToSearch);
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


        let printList = (<PrintScoupusSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>);


        resultPart = (
            <div className="paper-card-holder">
                <div className="order">
                        <label>sort by:</label>
                        <Select options={options} selected={orderBy} handler={handleSelection}/>
                        <button type="button" onClick={handelOrder}><OrderArrow up={(sort)}/></button>
                </div>
                {printList}
                <Pagination start={start} count={count} totalResults={totalResults} path={match.url}/>
                <button className="bottom-left-btn" type="submit" value="Submit">
                    +
                </button>
            </div>
        );
    }

    //if is loading
    if (display === false) {

        resultPart = (
            <div className="paper-card-holder">
                <div className="order" style={{pointerEvents: "none"}}>{/* this way the user cannot sort while loading the results */}
                        <label>sort by:</label>
                        <Select options={options} selected={orderBy} handler={handleSelection}/>
                        <button type="button" onClick={handelOrder}><OrderArrow up={(sort)}/></button>
                </div>
                <div className="search-loading-holder">
                    <LoadIcon class={"small"}/>
                </div>
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