import React, {useContext, useEffect} from 'react';
import {AppContext} from "../providers/appProvider";


const Error = function(){

    //get data from global context
    const appConsumer = useContext(AppContext);

    useEffect(() => {

        return () =>{
            //delete the error, so app can resume its work
            appConsumer.setError(null);
        }

    });


    return (
        <div className="error-wrapper" style={{textAlign : "center"}}>
            <h1>Error</h1>
            <p>Error name:</p>
            <p>{appConsumer.error.name}</p>
            <p>Error message</p>
            <p>{appConsumer.error.message}</p>
        </div>

    )

}



export  default  Error;