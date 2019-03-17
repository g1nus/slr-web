import React, { Component } from "react";
import CheckBox from "./checkbox";

const OPTIONS1 = ["option one", "option two", "option three"];

class SearchForm extends Component {
  state = { 
    query: '' , 
    checkboxes1: OPTIONS1.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  handleInputTextChange = event => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = event => {
    alert(this.state.query + "\n" + this.state.checkboxes1["option one"] + "\n" + this.state.checkboxes1["option two"] + "\n" + this.state.checkboxes1["option three"]);
    event.preventDefault();
  }

  handleCheckboxChange = event => {
    const { name } = event.target;
    this.setState(prevState => ({
      checkboxes1: {
        ...prevState.checkboxes1,
        [name]: !prevState.checkboxes1[name]
      }
    }));
  };

  createCheckbox = option => (
    <CheckBox label={option} isSelected={this.state.checkboxes1[option]} handler={this.handleCheckboxChange} key={option} />
  );

  createCheckboxes = () => OPTIONS1.map(this.createCheckbox);

  render(){
    return(
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={this.state.query}
          onChange={this.handleInputTextChange}
        />
        <div className="option-holder">
          <label>Option:</label><br/>
          <div className="checkboxes-holder">
            {this.createCheckboxes()}
          </div>
        </div>
        <button type="submit" value="Submit">
          <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 1000 1000">
            <path className="st0" d="M626.9,644.3c-73.5,0-142.6-28.6-194.6-80.6s-80.6-121.1-80.6-194.6s28.6-142.6,80.6-194.6
              c52-52,121.1-80.6,194.6-80.6c73.5,0,142.6,28.6,194.6,80.6c52,52,80.6,121.1,80.6,194.6s-28.6,142.6-80.6,194.6
              S700.4,644.3,626.9,644.3z"/>
            <line className="st1" x1="145.2" y1="850.8" x2="431.7" y2="564.3"/>
        </svg>
        </button>
      </form>
    );
  }
}

export default SearchForm;