import http from './../utils/conn'
import config from './../config/index'

/**
 * dao to get a projects list
 * @param queryData
 * @return {array[objects]}
 */
async function getProjectsList(queryData = "") {
    let url = config.home + config.projects
    let res = await http.get(url, queryData);
    return res;


}

/**
 * dao to get a project
 * @param project_id
 * @return {Object} project requested
 */
async function getProject(project_id) {
    let url = config.home + config.projects + "/" + project_id;
    let res = await http.get(url);
    return res;
}

/**
 * dao to post a new project
 * @param bodyData
 * @return {Object} project created
 */
async function postProject(bodyData) {
    let url = config.home + config.projects;
    return await http.post(url, bodyData);
}

/**
 * dao to put a old project
 * @param project_id
 * @param bodyData
 * @return {String} empty string
 */
async function putProject(project_id, bodyData) {
    let url = config.home + config.projects + "/" + project_id;
    return await http.put(url, bodyData);
}

/**
 * dao to delete a project
 * @param project_id
 * @param bodyData
 * @return {String} empty string
 */
async function deleteProject(project_id) {
    let url = config.home + config.projects + "/" + project_id;
    let res = await http.delete(url);
    return res;
}


const projectsDao = {
    "getProjectsList": getProjectsList,
    "getProject": getProject,
    "postProject": postProject,
    "putProject": putProject,
    "deleteProject": deleteProject,
    "abortRequest": http.abortRequest
}


export {projectsDao};