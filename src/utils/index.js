//need to parse query string of url
import queryString from 'query-string';

/**
 * there are the common support function
 */


/**
 * this is  function to manipolate 2 url string
 * if first string ends with "/", removes "/".
 * then concate wite second string and return new string
 */
function join(base, path){
    let newPath;
    //if the last element is "/"
    if(base.charAt(base.length-1) === '/'){
        newPath = base.slice(0,-1) + path;
    }
    else{
        newPath =base + path;
    }

    return newPath;

  }

/**
 *
 *
 * function that set pagesize and after value by query string (if exist)
 * @param query query string
 * @return {number[]} pagesize, before, after
 */
function setPaginationParamsFromQuery(query){
    //initial value
    let pagesize=10;
    let before=-1;
    let after=0;


    let params = queryString.parse(query);
    if(params.pagesize){
        pagesize = Number(params.pagesize);
    }
    //is there is before, ignore the after
    if(params.before){
        before = Number(params.before);
    }
    else if(params.after){
        after = Number(params.after);
    }
    return [pagesize, before, after];
}




export  { join, setPaginationParamsFromQuery};