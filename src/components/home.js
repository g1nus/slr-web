import React, {useContext, useEffect} from "react";

import {AppContext} from "src/components/providers/appProvider";

/**
 * this is home component
 */
const Home = function (props) {


    //get data from global context
    const appConsumer = useContext(AppContext);

    //set title when component mounts
    useEffect(() => {
        appConsumer.setTitle(<div className="nav-elements"> <h2 className="static-title">HOME</h2> </div>);
    },[])//run on component mount


    return (
        <>
            <h1>
                Systematic Literature Review manager
            </h1>
            <h2 style={{fontSize: 22, fontWeight: "normal"}}>the system right now allows you to</h2>
            <ul style={{fontSize: 18, fontWeight: "lighter"}}>
                <li>browse a list of prjects</li>
                <li>add a new project</li>
                <li>browse the list of papers on a project</li>
                <li>search(from scopus) and add papers to a project</li>
            </ul>
            <h2 style={{fontSize: 22, fontWeight: "normal"}}>notes</h2>
            <ul style={{fontSize: 18, fontWeight: "lighter"}}>
                <li><i>the scopus search works partially(can't retrieve the description)</i>
                    <ul><li style={{fontSize: 16}}><i>from Elsevier developer portal : "The data available depends on your institutional subscriptions, and only when you're making calls from within your institutional network are you considered a subscriber"</i></li></ul>
                </li>
                <li><i>the options don't affect the search, for now</i></li>
            </ul>
        </>
    );




};

export default Home;