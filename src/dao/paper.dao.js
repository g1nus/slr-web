import {http} from './../utils/conn'
import {config} from './../config/index'

/**
 * dao to search papers
 * @param queryData
 * @return {array[objects]}
 */
async function search(queryData){
    let url = config.home+config.search
    return await http.get(url, queryData);
}



const paperDao = {
    "search" : search,
    "abortRequest" : http.abortRequest
}



export {paperDao};