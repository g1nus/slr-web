import React from 'react';
import {BrowserRouter as Router, Route, } from "react-router-dom";


import NavBar from './components/navigation/navBar';
import Main from './components/main';
import Home from './components/home';
import  Projects from './components/projects';

import  {AppProvider} from './providers/appProvider';


/**
 *this is the start point of application
 */

const App = function(props) {

        return (
            <Router>
                <div className="app">

                    {/*mount a root context object*/}
                    <AppProvider>

                        <NavBar/>
                        <Main>
                            <Route exact path="/" render={() => <Home/> }/>
                            <Route path="/projects" render={(props) => <Projects {...props} /> }/>
                        </Main>

                    </AppProvider>
                </div>
            </Router>
        );

}

export default App;
