import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import ClampLines from 'react-clamp-lines';

import CheckBox from "./checkbox";
import {paperDao} from '../../dao/paper.dao';
import {projectPapersDao} from '../../dao/projectPapers.dao'
import LoadIcon from '../svg/loadIcon';

const OPTIONS1 = ["option one", "option two", "option three"];

const SearchForm = ({projectId, query, setQuery, checkboxes, setCheckboxes, results, setResults, selectedpapers, setSelectedPapers}) => {
    const [searching, setSearching] = useState(false);

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

    function addPapers() {
        const postData = async () => {
            for (let i = 0; i < selectedpapers.length; i++) {
                let res = await projectPapersDao.postPaperIntoProject({
                    paper_id: selectedpapers[i], project_id: projectId
                });
            }
        }
        postData();
    }

    function createCheckboxes() {
        return OPTIONS1.map(option => {
            return <CheckBox label={option} isSelected={checkboxes.one[option]} handler={handleCheckboxChange}
                             key={option}/>
        })
    }

    function updateSearchResults() {
        //a wrapper function ask by reat hook
        const fetchData = async () => {
            //call the dao
            setSearching(true);
            let res = await paperDao.search({query: query});
            //update state
            setSearching(false);
            setResults(res);
        }
        fetchData();
    }

    function showResults() {
        if (results[0] === "not_found") {
            return <>not found :(</>
        }
        else {
            return results.map((element, index) =>
                <div key={index} className="paper-card">
                    <CheckBox val={element.id} label={""} handler={handlePaperSelection}/>
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
            )
        }
    }

    useEffect(() => {
        if (query !== '') {
            updateSearchResults();
        }
        if (query === '') {
            setResults([]);
        }
    }, []);//this way is executed only on mount

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
                        <svg id="search-icon" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 1000 1000">
                            <path className="st0" d="M626.9,644.3c-73.5,0-142.6-28.6-194.6-80.6s-80.6-121.1-80.6-194.6s28.6-142.6,80.6-194.6
                c52-52,121.1-80.6,194.6-80.6c73.5,0,142.6,28.6,194.6,80.6c52,52,80.6,121.1,80.6,194.6s-28.6,142.6-80.6,194.6
                S700.4,644.3,626.9,644.3z"/>
                            <line className="st1" x1="145.2" y1="850.8" x2="431.7" y2="564.3"/>
                        </svg>
                    </button>
                </div>
                <div className="option-holder">
                    <label>Option:</label><br/>
                    <div className="checkboxes-holder">
                        {createCheckboxes()}
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

export default SearchForm;