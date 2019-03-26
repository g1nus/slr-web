import React, {useState, useEffect} from 'react';

//dao function to access paper resource
import {paperDao} from './dao/paper.dao'


function Test() {

    //state that storage query string
    const [queryString, setQueryString] = useState({"query": "2014"});
    //state that storage result (list of papers)
    const [list, setList] = useState([]);

    useEffect(() => {
        //a wrapper function ask by reat hook
        const fetchData = async () => {
            //call the dao
            const res = await paperDao.search(queryString);
            //update state
            setList(res);
        }
        fetchData();

        //when the component will unmount
        return () => {
            //stop all ongoing request
            paperDao.abortRequest();
        };
    }, [queryString]); //re-excute only searchQuery is changed


    let fontSizeStyle = {"fontSize": 15};
    return (
    <div style = {fontSizeStyle} >
        {list.map(
            paper =>
                <p> id {paper.id} {paper.data.EID} {paper.data.Title}</p>
        )}
    </div>
    );
}

export default Test;
