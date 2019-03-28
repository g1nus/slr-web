/*this is the file to communicate with backend by fetch request*/

//signal to abort the request
var abortController;
//int to know abort error type
var abortRequestType;
//10seconds for timeout
var timeOutTime = 10 * 1000;

//object to export
const http = {
    "get": get,
    "post": post,
    "delete": deletes,
    "put": put,
    "abortRequest": abortRequest,

}


/**
 * abort all request in progeress by user
 */
function abortRequest() {
    abortController.abort();
    abortRequestType = 1;
}

/**
 * abort all request if timeout
 */
function timeOut(){

    abortController.abort();
    abortRequestType = 2;
}

/**
 * create a basic fetch request
 * @param url
 * @param options request config
 * @return {object} response data
 */
async function request(url, options = {}) {
    try {

        //create a new abortController for this request
        abortController =  new AbortController();
        let signal = abortController.signal;
        //initialize as 0 for every request
        abortRequestType=0;

        let requestOptions = Object.assign(
            {
                //enable the  sending of cookie
                credentials: 'include',
                "mode": 'cors',
                "signal": signal
            },
            options
        );

        setTimeout(() => abortController.abort(), timeOutTime);
        let response = await fetch(url, requestOptions);

        //response error check
        checkResponseStatus(response);
        //parse response data
        response = await parseResponseData(response);
        //console.log(response);

        return response;

    } catch (error) {
        //if abort error is caused by timeout
        if(abortRequestType === 2){
            //create a custom error for timeout
            let timeOutError = new Error("Error: Time out to get response from backend");
            timeOutError.name ="timeout";
            throw  timeOutError;
        }
        //if isn't a abort error  caused by user
        else if(abortRequestType !== 1){
            throw error;
        }

        return null;
    }
}

/**
 * get method
 * @param url
 * @param queryData quey string
 * @return {object} response data
 */
async function get(url, queryData = "") {
    let query = "";
    if (queryData !== "") {
        query = "?";
        for (let key in queryData) {
            query += key + "=" + encodeURIComponent(queryData[key]) + "&";
        }
        //delete the last &
        query = query.slice(0, query.length - 1);
    }
    return await request(url + query);
}

/**
 * deletes method
 * @param url
 */
async function deletes(url) {
    let options = {
        "method": 'DELETE'
    };

    await request(url, options);
}

/**
 * post method
 * @param url
 * @param bodyData
 * @return {object } response data
 */
async function post(url, bodyData = "") {

    let jsonHeaders = new Headers();
    jsonHeaders.append('Accept', 'application/json, text/plain, */*');
    jsonHeaders.append('Cache-Control', 'no-cache');
    jsonHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    let body = JSON.stringify(bodyData, null, 2);
    let options = {
        "method": 'POST',
        "headers": jsonHeaders,
        "body": body,
    };

    return await request(url, options);
}




/**
 * put method
 * @param url
 * @param bodyData
 */
async function put(url, bodyData = "") {

    let jsonHeaders = new Headers();
    jsonHeaders.append('Accept', 'application/json, text/plain, */*');
    jsonHeaders.append('Cache-Control', 'no-cache');
    jsonHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    let body = JSON.stringify(bodyData, null, 2);
    let options = {
        "method": 'PUT',
        "headers": jsonHeaders,
        "body": body,
    };

    return await request(url, options);
}


/**
 *  * check resposonse status
 * @param response to check
 * @throws {Error} if  status code < 200 or status code >= 300
 */
function checkResponseStatus(response) {
    if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.data = response;
        throw error;
    }

}

/**
 * parse the response of  http request
 * @param response
 * @return {object} data parsed
 */
async function parseResponseData(response) {
    //get response data type
    const contentType = response.headers.get('Content-Type');
    let data;
    //parse the data by its type
    if (contentType != null) {
        if (contentType.indexOf('text') > -1) {
            data = await response.text()
        }
        if (contentType.indexOf('form') > -1) {
            data = await response.formData();
        }
        if (contentType.indexOf('video') > -1) {
            data = await response.blob();
        }
        if (contentType.indexOf('json') > -1) {
            data = await response.json();
        }
    } else {
        data = await response.text();
    }
    return data;
}


export default  http;