import React, {useState} from 'react';

import NavBar from './../components/navigation/navBar';
import Main from './../components/main';
import Error from './../components/error';

//create a context object
const AppContext = React.createContext();

/**
 * this is the component that include a context object that it can be access by all its children component
 */
const AppProvider = function (props) {

    //user info
    const [user, setUser] = useState({
        image: <img className="face" alt="profile" src="https://placekitten.com/100/100"/>,
        name: "mario",
        surname: "super"
    });

    //error
    const [error, setError] = useState(null);


    //preparate an object to be insertd into context
    const valueObject = {
        user,
        error,
        setError
    }

    //if there isn't error
    if (!error) {
        return (
            //*set the values of contenxt*
            <AppContext.Provider value={valueObject}>

                {/*mount all components children*/}
                {props.children}

            </AppContext.Provider>
        );
    }
    //if there is a error
    else {
        return (
            //*set the values of contenxt*
            <AppContext.Provider value={valueObject}>

                    <Error/>

            </AppContext.Provider>
        )
    }


}

export {AppContext, AppProvider};