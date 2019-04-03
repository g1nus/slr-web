import React, {useContext, useEffect} from "react";

import {AppContext} from "./providers/appProvider";

/**
 * this is home component
 */
const Home = function (props) {


    //get data from global context
    const appConsumer = useContext(AppContext);

    //set title when component mounts
    useEffect(() => {
        appConsumer.setTitle("HOME");
    },[])//run on component mount


    return (
        <h1>
            hallo world

        </h1>

    );




};

export default Home;