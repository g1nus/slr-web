import React from 'react';
import {Link} from 'react-router-dom';

import {join} from 'src/utils/index';

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
                <Link className="before" to={join(path, "before=" + before)}>
                    {"< prev"}
                </Link>
            );
        }
        //show next button only continues is true
        if (pagination.continues) {
            nextLink = (

                <Link className="after" to={join(path, "after=" + after)}>
                    {"next >"}
                </Link>

            )
        }
        output = (
            <div className="pagination">
                {prevLink}
                {nextLink}
            </div>
        );

    }
    return output;

}


export default Pagination;