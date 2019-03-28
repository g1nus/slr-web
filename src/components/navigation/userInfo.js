import React, {useContext} from "react";
import { AppContext } from './../../providers/appProvider'

/*
* this is the component that visualize user information box
* */
const UserInfo = function(props){

    //get data from global context
    const appConsumer = useContext(AppContext);

    return(
            <div className="user" >
                {appConsumer.user.image}
                <div className="user-info">
                    {appConsumer.user.name}
                    <br/>
                    {appConsumer.user.surname}
                </div>
            </div>
    );
}

export  default  UserInfo;