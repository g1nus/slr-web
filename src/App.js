import React, {Component} from 'react';
import {BrowserRouter as Router, Route, /*Link, Switch*/} from "react-router-dom";
//import logo from './svg/logo.svg';
import './App.css';

import LoadIcon from './components/loadicon';
import NavBar from './components/navigation/navbar';
import Main from './components/main';
import ProjectsList from './components/projectslist';
import ProjectPage from './components/projectpage';

import {AccountProvider} from './providers/AccountProvider';

class App extends Component {
    state = {
        menu_list: [
            {id: 4, content: "my projects", link: "/projects"},
            {id: 5, content: "option3", link: "/"},
            {id: 6, content: "option4", link: "/projects/1"}],
    };

    render() {
        return (
            <Router>
                <div className="app">

                    {/*mount component with context object*/}
                    <AccountProvider>

                        {/*inputs of AccountProvider*/}
                        <NavBar menu_elements={this.state.menu_list}></NavBar>
                        {/*router by url*/}
                        <Route exact path="/" render={() => <Main main_element={<LoadIcon/>}></Main>}/>
                        <Route exact path="/projects" render={(props) => <Main main_element={<ProjectsList {...props} />}></Main>}/>
                        <Route path="/projects/:id" render={(props) => <Main main_element={<ProjectPage {...props} />}></Main>}/>

                    </AccountProvider>
                </div>
            </Router>
        );
    }
}

export default App;
