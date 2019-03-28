import http from './../utils/conn'
import config from './../config/index'

/**
 * dao to search papers
 * @param queryData
 * @return {array[objects]}
 */
async function search(queryData){
    let url = config.home+config.search
    try{
        const res = await http.get(url, queryData);
        console.log(res);
        return res.results;
    }catch(e){
        return ["not_found"];
    }
}



const paperDao = {
    "search" : search,
    "abortRequest" : http.abortRequest
}



export {paperDao};