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
    const initialCheckboxesState = {scopus: false, option2: false, option3: false};
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
    const scopus = params.scopus || false;
    const option2 = params.option2 || false;
    const option3 = params.option3 || false;
    const queryData = {pagesize, query};
    if (before >= 0) {
        queryData.before = before;
    }
    else {
        queryData.after = after;
    }
    if (scopus) {
        queryData.scopus = scopus;
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

                let res;
                //call the dao to get local papers
                if(scopus === false){
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

    }, [query, before, after, scopus, option2, option3, project_id]);  //re-execute when these variables change

    /**
     * update the checkbox state
     */
    function handleCheckboxChange(e) {
        //copy the object
        let newState = {...checkboxes};
        let optionName = e.target.name;
        switch (optionName) {
            case "scopus":
                newState.scopus = !newState.scopus;
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
            if (checkboxes.scopus) {
                queryParams += "&scopus=true";
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
                    <label>Option:</label><br/>
                    <div className="checkboxes-holder">

                        <CheckBox label="scopus" isChecked={checkboxes.scopus} handler={handleCheckboxChange}/>
                        <CheckBox label="option2" isChecked={checkboxes.option2} handler={handleCheckboxChange}/>
                        <CheckBox label="option3" isChecked={checkboxes.option3} handler={handleCheckboxChange}/>

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
                (<PrintSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>)
                :
                ( <PrintScoupusSearchList papersList={papersList} handlePaperSelection={handlePaperSelection}/>)
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


/*local component to print search result list of papers*/
const PrintSearchList = function ({papersList, handlePaperSelection}) {

    let output = papersList.map((element, index) =>
        <div key={element.id} className="paper-card">
            <CheckBox val={element.id} label={""} handler={handlePaperSelection}/>
            <Link to={"#"}><h3>{element.id} {element.data && element.data.Title}</h3></Link>
            <ClampLines
                text={element.data && element.data.Abstract}
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

/*local component to print scopus search result list of papers*/
const PrintScoupusSearchList = function ({papersList, handlePaperSelection}) {

    let exampleAbstract ="I am a description I am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a descriptionI am a description";

    let output = papersList.map((element, index) =>
        <div key={element.id} className="paper-card">
            <CheckBox val={element.id} label={""} handler={handlePaperSelection}/>
            <Link to={"#"}><h3>{element.id} {element.Title}</h3></Link>
            <ClampLines
                text={exampleAbstract}
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