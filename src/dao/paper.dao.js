import http from './../utils/conn'
import config from './../config/index'

/**
 * dao to search local papers
 * @param queryData
 * @return {array[objects]}
 */
async function search(queryData){
    let url = config.home+config.search;

        const res = await http.get(url, queryData);
        return res;

}

/**
 * dao to search scopus papers
 * @param queryData
 * @return {array[objects]}
 */
async function scopusSearch(queryData){
    let url = config.home+config.scopus_search;

    const res = await http.get(url, queryData);
    return res;

}



const paperDao = {
    search,
    scopusSearch,
    "abortRequest" : http.abortRequest
}



export {paperDao};