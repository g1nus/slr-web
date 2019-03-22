import React, { Component } from 'react';
//import logo from './svg/logo.svg';


//component to show loading icon
import LoadIcon from './components/loadicon';
import SearchForm from './components/forms/searchform';
import NavBar from './components/navigation/navbar';
import Main from './components/main';

//test component
import Test from './test';

import './App.css';

class App extends Component {
    state = {
        //user info
        "user": {image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>, name: "Bobinsky", surname: "Sylvester"},
        //nav menu list 
        "nav_list": [{id: 1, content: "PAGE 1", link: "pag1", selected: "selected"},
            {id: 2, content: "PAGE 2", link: "pag2", selected: ""}],
        //left menu lista
        "menu_list": [{id: 3, content: "option1", link: "search"},
            {id: 4, content: "option2", link: ""},
            {id: 5, content: "option3", link: ""},
            {id: 6, content: "option4", link: ""}],
        // = component to show loading icon
        "main": <LoadIcon></LoadIcon>
    };

    handleNavLinkClick = link => {
        this.setState(prevState => {
            const nav_list = prevState.nav_list.map((item) => {
                let newitem = item;
                if (item.link === link)
                {

                    newitem.selected = "selected";
                }
                else
                {

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
        if (link === "search")
        {
            this.setState({main: <SearchForm></SearchForm>});
        }
        else
        {
            this.setState({main: <LoadIcon></LoadIcon>});
        }
    }

    render() {
        return (
                <div className="app">
                    <NavBar navhandler={this.handleNavLinkClick} menuhandler={this.handleMenuLinkClick} user_elements={this.state.user} nav_elements={this.state.nav_list} menu_elements={this.state.menu_list} underline={15}></NavBar>
                    <Main main_element={this.state.main}></Main>

                    //test component
                     <Test />

                </div>
                );
    }
}

export default App;
