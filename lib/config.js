global.apiURL = global.apiURL || null;

export function getApiURL(){
    debugger;
    if (!global.apiURL || global.apiURL == null){
        global.apiURL = window.location.protocol + '//' + window.location.host + "/api"
    }
    return global.apiURL;
}