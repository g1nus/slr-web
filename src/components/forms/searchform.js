import React, { useState } from "react";
import { Link } from 'react-router-dom'
import CheckBox from "./checkbox";
import ClampLines from 'react-clamp-lines';

//the papers will be fetched through an api
const PAPERS = [{id:"1", title:"paper one", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"2", title:"paper two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}, 
                  {id:"3", title:"paper two", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum mauris tristique quam tincidunt, nec sodales mauris ornare. Nunc non sapien eu felis interdum vehicula. Donec lacinia scelerisque ullamcorper. Sed viverra a dolor vitae volutpat. Duis non est non ligula lobortis fermentum. Donec finibus diam est, eget aliquet eros pellentesque vel. Nulla sit amet purus neque. Fusce pulvinar lobortis felis, in laoreet massa sollicitudin vestibulum. In consectetur felis massa, at varius justo ultricies in. Curabitur egestas euismod justo, sit amet consectetur velit sagittis eu. Phasellus ornare in libero eget semper. Sed quis risus in nulla mattis vestibulum. "}];
const OPTIONS1 = ["option one", "option two", "option three"];

const  SearchForm = ({query, setQuery, checkboxes, setCheckboxes, results, setResults}) => {

  function handleCheckboxChange(e){
    const { name } = e.target;
    const prevCheckboxes = checkboxes;
    setCheckboxes({
      one: {
        ...prevCheckboxes.one,
        [name]: !prevCheckboxes.one[name]
      }
    });
  }

  function createCheckboxes(){return OPTIONS1.map(option => {return <CheckBox label={option} isSelected={checkboxes.one[option]} handler={handleCheckboxChange} key={option} />})}

  function updateSearchResults(papers){
    console.log(papers)
    setResults(papers)
  }

  return(
    <>
      <form className={(results.length === 0) ? 'search-form' : 'search-form small' } onSubmit={(e) => {
        e.preventDefault();
        updateSearchResults(PAPERS);
        }}>
        <div style={{position:'relative'}}>
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" value="Submit" disabled={(query === '')}>
            <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
      <form className="search-results" style={{visibility: (results.length === 0) ? 'hidden' : '' }}>
          {results.map((element, index) =>
                <div key={index} className="paper-card">
                <CheckBox label={""}/>
                  <Link to={"#"}><h3>{element.title}</h3></Link>
                  <ClampLines
                    text={element.description}
                    lines= {4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    className="paragraph"
                    moreText={"more"}
                    lessText={"less"}
                  />
                </div>
              
          )}
          <button type="submit" value="Submit">+</button>
        </form>
    </>

  );
}

export default SearchForm;