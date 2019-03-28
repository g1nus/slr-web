import http from './../utils/conn'
import config from './../config/index'

/**
 * dao to get a list of paper associated with a project
 * @param queryData
 * @return {array[objects]}
 */
async function getPapersList(queryData) {
    let url = config.home + config.papers
    try{
        const res = await http.get(url, queryData);
        return res;
    }catch(e){
        if(e.message === "Not Found"){
            return null;
        }else{
            return e;
        }
    }
}

/**
 * dao to get a paper
 * @param paper_id
 * @return {Object} paper requested
 */
async function getPaper(paper_id) {
    let url = config.home + config.papers+"/"+paper_id;
    return await http.get(url);
}

/**
 * dao to post a new paper
 * @param bodyData
 * @return {Object} project created
 */
async function postPaperIntoProject(bodyData) {
    let url = config.home + config.papers;
    console.log(bodyData);
    return await http.post(url, bodyData);
}

/**
 * dao to put a old paper
 * @param paper_id
 * @param bodyData
 */
async function putPaper(paper_id, bodyData) {
    let url = config.home + config.papers+"/"+paper_id;
    await http.put(url, bodyData);
}

/**
 * dao to delete a paper
 * @param paper_id
 * @param bodyData
 */
async function deletePaper(paper_id) {
    let url = config.home + config.papers+"/"+paper_id;
    await http.delete(url);
}



const projectPapersDao = {
    "getPapersList": getPapersList,
    "getPaper": getPaper,
    "postPaperIntoProject": postPaperIntoProject,
    "putPaper": putPaper,
    "deletePaper": deletePaper,
    "abortRequest": http.abortRequest
}


export {projectPapersDao};