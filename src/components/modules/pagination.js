import React from 'react';
import {Link} from 'react-router-dom';

import {join} from './../../utils/index';

/**
 * this is the component for paginaton
 * @param after last element's id
 * @param pagination object {hasbefore, continues}
 * @param path current page path
 * @return {*}
 * @constructor
 */
const Pagination = function ({before, after, pagination, path}) {

    let output = null;
    let prevLink ="";
    let nextLink = "";

    //if there is hasbefore or continues
    if (pagination.hasbefore || pagination.continues) {

        //show prev button only hasbefore is true
        if (pagination.hasbefore) {
            prevLink = (
                <Link to={join(path, "before=" + before)} style={{width: "50%", display: "inline-block"}}>
                    prev
                </Link>
            );
        }
        //show next button only continues is true
        if (pagination.continues) {
            nextLink = (

                <Link to={join(path, "after=" + after)} style={{width: "50%", display: "inline-block"}}>
                    next
                </Link>

            )
        }
        output = (
            <div className="pagination" style={{clear: "both", fontSize: 18, margin: 20, width: "100%"}}>
                {prevLink}
                {nextLink}
            </div>
        );

    }
    return output;

}


export default Pagination;