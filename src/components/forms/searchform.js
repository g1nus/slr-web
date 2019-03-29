import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import ClampLines from 'react-clamp-lines';

import CheckBox from "./checkbox";
import {paperDao} from './../../dao/paper.dao';
import {projectPapersDao} from './../../dao/projectPapers.dao'
import LoadIcon from './../svg/loadIcon';
import SearchButton from './../svg/searchButton';

import { AppContext } from './../../providers/appProvider'

const OPTIONS1 = ["option one", "option two", "option three"];

/*this is component form to search for the paper in project page*/

const SearchForm = ({projectId, query, setQuery, checkboxes, setCheckboxes, results, setResults, selectedpapers, setSelectedPapers}) => {

    //bool to control the visualization of page
    const [searching, setSearching] = useState(false);

    //get data from global context
    const appConsumer = useContext(AppContext);

    /**
     * update the checkbox state of project page
     */
    function handleCheckboxChange(e) {
        const {name} = e.target;
        const prevCheckboxes = checkboxes;
        setCheckboxes({
            one: {
                ...prevCheckboxes.one,
                [name]: !prevCheckboxes.one[name]
            }
        });
    }

    /*function to insert and remove the paper id from selected list*/
    function handlePaperSelection(e) {
        const id = e.target.value;
        if (!selectedpapers.includes(id)) {
            var array = selectedpapers;
            array.push(id);
            setSelectedPapers(array);
        }
        else {
            var array = selectedpapers.filter(function (value, index, arr) {
                return value !== id;
            });
            setSelectedPapers(array);
        }
    }

    /*function to add the post in the project*/
    async function addPapers() {
        for (let i = 0; i < selectedpapers.length; i++) {
            let res = await projectPapersDao.postPaperIntoProject({
                paper_id: selectedpapers[i], project_id: projectId
            });
        }
    }


    /*
     * update the search result
     * */
    async function updateSearchResults() {
        //call the dao
        setSearching(true);
        let res = await paperDao.search({query: query});

        //error checking
        //if is 404 error
        if(res.message == "Not Found"){
            setResults(["not_found"]);
            setSearching(false);
        }
        //if is other error
        else if(res.message){
            //pass error object to global context
            appConsumer.setError(res);
        }
        //if res isn't null
        else if (res !== null){
            //update state
            setResults(res.results);
            setSearching(false);
        }
    }


    function showResults() {
        if (results[0] === "not_found") {
            return <>not found :(</>
        }
        else {
            return <PrintSearchResultList results={results} handlePaperSelection={handlePaperSelection}/>
        }
    }

    /*update the results in mount time*/
    useEffect(() => {

        if (query !== '') {
            updateSearchResults();
        }

        if (query === '') {
            setResults([]);
        }
    }, []);//this way is executed only on mount

    /*re-render page when results are changed*/
    useEffect(() => {
        setSelectedPapers([]);
    }, [results]);

    return (
        <>
            <form className={(results.length === 0) ? 'search-form' : 'search-form small'} onSubmit={(e) => {
                e.preventDefault();
                updateSearchResults();
            }}>
                <div style={{position: 'relative'}}>
                    <input
                        type="text"
                        placeholder="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button type="submit" value="Submit" disabled={(query === '' || searching)}>
                        <SearchButton/>
                    </button>
                </div>
                <div className="option-holder">
                    <label>Option:</label><br/>
                    <div className="checkboxes-holder">
                        <PrintCheckboxes checkboxes={checkboxes} handleCheckboxChange={handleCheckboxChange}/>
                    </div>
                </div>
            </form>
            <div className="loading-holder" style={{visibility: (!searching) ? 'hidden' : ''}}>
                <LoadIcon></LoadIcon>
            </div>
            <form className="search-results" style={{visibility: (results.length === 0 || searching) ? 'hidden' : ''}}
                  onSubmit={(e) => {
                      e.preventDefault();
                      addPapers();
                  }}>
                {showResults()}
                <button className="bottom-left-btn" type="submit" value="Submit"
                        style={{visibility: (results.length === 0 || results[0] === "not_found") ? 'hidden' : ''}}>+
                </button>
            </form>
        </>

    );
}

/*local component to print checkboxs*/
const  PrintCheckboxes = function(props) {
    return OPTIONS1.map(option => {
        return <CheckBox label={option} isSelected={props.checkboxes.one[option]} handler={props.handleCheckboxChange}
                         key={option}/>
    })
}

/*local component to print search result list of papers*/
const PrintSearchResultList = function (props) {

    return props.results.map((element, index) =>
        <div key={index} className="paper-card">
            <CheckBox val={element.id} label={""} handler={props.handlePaperSelection}/>
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
    );

}



export default SearchForm;