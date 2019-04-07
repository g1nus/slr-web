import React from 'react';
import {Link} from 'react-router-dom';

import config from 'src/config/index';

/**
 * this is the component for pagination
 * @param start offset of results
 * @param count number of element for page
 * @param totalResults the total number of results
 * @param path the path of current page
 * @return {*}
 * @constructor
 */

const Pagination = function({start, count, totalResults, path}) {

    //set limit max of start
    if(totalResults >config.max_total_number_for_results){
        totalResults= config.max_total_number_for_results;
    }
    //prepare the correct link path for pagination
    path = setStartAndCountInUrl(path);

    let prev = "", next = "", firstPage = "", lastPage = "";
    let listPage = [] ;
    let separator = "...";
    //number*2 of element in pagination
    let paginationLength = 4;
    //the page count start by 1.
    let paged = Math.floor(start / count) + 1;
    //get total page number
    let totalPage = Math.round(totalResults / count);

    //we need the pagination only the totalPage is major than 1
    if (totalPage > 1) {

        //if it isn't the first page, print the prev-page link
        if (paged > 1) {
            prev = (
                <li style={{display: "inline-block", margin: 10}}>
                    <Link className="prev-page"
                          to={path + "start=" + (((paged - 1) * count) > 0 ? ((paged - 2) * count) : 0) + "&count=" + count}>
                        {"<"}
                    </Link>
                </li>
            );
        }
        //if it isn't the last page, print the next-page link
        if (paged < totalPage) {
            next = (
                <li style={{display: "inline-block", margin: 10}}>
                    <Link className="next-page" to={path + "start=" + (paged * count) + "&count=" + count}>
                        {">"}
                    </Link>
                </li>
            );
        }

        //if the first page  isn't include by regular listPage, print the first-page link
        if (paged > paginationLength + 2) {
            firstPage = (
                <>
                    <li style={{display: "inline-block", margin: 10}}>
                        <Link className="first-page" to={path + "start=0&count=" + count}>
                            {"1"}
                        </Link>
                    </li>
                    <li style={{display: "inline-block", margin: 10}}>
                        <span>{separator}</span>
                    </li>
                </>
            );
        }

        //if the last page  isn't include by regular listPage, print the last-page link
        if (paged < totalPage - (paginationLength + 1)) {
            lastPage = (
                <>
                    <li style={{display: "inline-block", margin: 10}}>
                        <span>{separator}</span>
                    </li>
                    <li style={{display: "inline-block", margin: 10}}>
                        <Link style={{display: "inline-block"}} className="last-page"
                              to={path + "start=" + ((totalPage - 1) * count) + "&count=" + count}>
                            {totalPage}
                        </Link>
                    </li>
                </>
            );
        }

        //print the range of page link, the center is current paged
        for (let i = paged - paginationLength; i <= paged + paginationLength; i++) {

            //print only the i has a valid value
            if (i > 0 && i <= totalPage) {

                //if i isn't current page, print link
                if (i !== paged) {

                    listPage.push((
                            <Link className="normal-page" to={path + "start=" + ((i-1) * count) + "&count=" + count}>
                                {i}
                            </Link>
                    ));
                }
                //if i is current page, print only text
                else {
                    listPage.push((
                            <span style={{color: "red"}}className="current-page">{paged}</span>
                    ));
                }

            }
        }


    }

    let output = (
        <ul style={{listStyleType: "none" }}className="pagination">
            {prev}
            {firstPage}
            {listPage.map((element,index)=><li style={{display: "inline-block", margin: 10}} key={index}>{element}</li>)}
            {lastPage}
            {next}
        </ul>
    );
    return output;
};


/**
 * internal function to prepare the path link for pagination
 * @param path
 * @return {*}
 */

function setStartAndCountInUrl(path){

    let url = window.location.href;
    //get the queryString from url
    let queryString = url.split("?")[1];
    //if it exists
    if(queryString) {
        //remove the part after # if it exists
        queryString = queryString.split("#")[0];

        let newQueryString = "";
        //split queryString in array of string
        let arryQuery = queryString.split("&");
        for (let i = 0; i < arryQuery.length; i++) {
            //check each queryElement
            let parameterName = arryQuery[i].split("=")[0];
            //if it isn't start and count
            if (parameterName !== "start" && parameterName !== "count") {
                //add to the new queryString
                newQueryString += arryQuery[i]+"&";
            }
        }
        //create a new path whiteout start and count
        path = path+"?"+newQueryString;
    }
    //if path doesn't contain any queryString
    else {
        path = path+"?";
    }


    return path;

}


























export default Pagination;