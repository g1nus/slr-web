import React, {useState} from 'react';

//create a context object
const AppContext = React.createContext();

/**
 * this is the component that include a context object that it can be access by all its children component
 */
const AppProvider = function (props) {

        //user info
        const [user, setUser] = useState({
            image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>,
            name: "mario",
            surname: "super"
        });


        //preparate an object to be insertd into context
        const valueObject ={
            user: user
        }

        return (
         //*set the values of contenxt*
        <AppContext.Provider value={valueObject}>

            {/*mount all components children*/}
            {props.children}

        </AppContext.Provider>
        );

}

export  {AppContext, AppProvider};