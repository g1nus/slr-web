import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/navigation/navbar';
import { LoadIcon } from './components/loadicon';
import { Main } from './components/main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {image: <img class="face" alt="profile image" src="https://placekitten.com/100/100"></img>,name:"Bobinsky", surname:"Sylvester"},
      nav_list: [],
      menu_list: [{id:3, content: <a className="menu-option">option1</a>}, 
                  {id:4, content: <a className="menu-option">option2</a>}, 
                  {id:5, content: <a className="menu-option">option3</a>}, 
                  {id:6, content: <a className="menu-option">option4</a>}],
      main: <LoadIcon></LoadIcon>
    };
  }
  render() {
    return (
      <div className="app">
        <NavBar user_elements={this.state.user} nav_elements={this.state.nav_list} menu_elements={this.state.menu_list}></NavBar>
        <Main main_element={this.state.main}></Main>
      </div>
    );
  }
}

export default App;
