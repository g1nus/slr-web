import http from './../utils/conn'
import config from './../config/index'

/**
 * dao to search papers
 * @param queryData
 * @return {array[objects]}
 */
async function search(queryData){
    let url = config.home+config.search;

        const res = await http.get(url, queryData);
        return res;

}



const paperDao = {
    "search" : search,
    "abortRequest" : http.abortRequest
}



export {paperDao};