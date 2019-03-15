import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/navigation/navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {image: <img class="face" alt="profile image" src="https://placekitten.com/100/100"></img>,name:"bobinsky", surname:"smith"},
      nav_list: [],
      menu_list: [{id: 3, content: 'option1'}, {id: 4, content: 'option2'}, {id:5, content: 'option3'}, {id:6, content: 'option4'}]
    };
  }
  render() {
    return (
      <NavBar user_elements={this.state.user} nav_elements={this.state.nav_list} menu_elements={this.state.menu_list}></NavBar>
    );
  }
}

export default App;
