import React, { Component } from 'react';
import { BrowserRouter as Router, Route, /*Link, Switch*/ } from "react-router-dom";
//import logo from './svg/logo.svg';
import './App.css';
import LoadIcon from './components/loadicon';
import SearchForm from './components/forms/searchform';
import NavBar from './components/navigation/navbar';
import Main from './components/main';
import { AccountProvider } from './providers/AccountProvider';

class App extends Component {
  state = {
      user: {image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>,name:"Bobinsky", surname:"Sylvester"},
      nav_list: [{id:1, content: "PAGE 1", link: "pag1", selected: "selected"},
                 {id:2, content: "PAGE 2", link: "pag2", selected: ""}],
      menu_list: [{id:3, content: "option1", link: "/search"}, 
                  {id:4, content: "option2", link: "/"}, 
                  {id:5, content: "option3", link: "/"}, 
                  {id:6, content: "option4", link: "/"}],
      main: <LoadIcon></LoadIcon>
  };

  handleNavLinkClick = link => {
    this.setState(prevState => {
      const nav_list = prevState.nav_list.map((item) => {
        let newitem = item;
        if (item.link === link) {
          newitem = item;
          newitem.selected = "selected";
        } else {
          newitem = item;
          newitem.selected = "";
        }
        return newitem;
      });
      return {
        main: <LoadIcon></LoadIcon>,
        nav_list,
      };
    });
  }

  handleMenuLinkClick = link => {
    if(link === "search"){
      this.setState({main: <SearchForm></SearchForm>});
    }else{
      this.setState({main: <LoadIcon></LoadIcon>});
    }
  }
  
  render() {
    return (
      <Router>
        <div className="app">
          <AccountProvider>
            <NavBar navhandler={this.handleNavLinkClick} menuhandler={this.handleMenuLinkClick} user_elements={this.state.user} nav_elements={this.state.nav_list} menu_elements={this.state.menu_list}></NavBar>
            <Route exact path = "/" render={() => <Main main_element={<LoadIcon />}></Main>} />
            <Route extact path = "/search" render={() => <Main main_element={<SearchForm />}></Main>} />
          </AccountProvider>
        </div>
        </Router>
    );
  }
}

export default App;
