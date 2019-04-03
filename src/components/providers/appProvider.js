import React, {useState, useRef} from 'react';

import NavBar from './../navigation/navBar';
import Main from './../main';
import Error from './../modules/error';

//create a context object
const AppContext = React.createContext();

/**
 * this is the component that include a context object that it can be access by all its children component
 */
const AppProvider = function (props) {

    const user = {
        image: <img className="face" alt="profile" src="https://placekitten.com/100/100"/>,
        name: "mario",
        surname: "super"
    };

    //error
    const [error, setError] = useState(null);

    //title
    const [title, setTitle] = useState("HOME");

    //preparate an object to be insertd into context
    const contextObject ={
        user,
        error,
        setError,
        title,
        setTitle
    };


    //if there isn't error
    if (!error) {

        return (
            //*set the values of contenxt*
            <AppContext.Provider value={contextObject}>

                {/*mount all components children*/}
                {props.children}

            </AppContext.Provider>
        );
    }
    //if there is a error
    else {
        return (
            //*set the values of contenxt*
            <AppContext.Provider value={contextObject}>

                    <Error/>

            </AppContext.Provider>
        )
    }


}

export {AppContext, AppProvider};