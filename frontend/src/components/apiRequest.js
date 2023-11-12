import axios from "axios"

//insert url and any additional parameters
/*
    params are the ?x=....&y=..... 
    insert this as a string of x=....&y=..... without the ?

    body is for POST requests. Not needed here.
*/
function apiRequest(url="",params="", body="", method="GET") {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url + (params == ""?params:"?"+params),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: body,
            responseType: "json",
            proxy: false
        }).then((res) => {
            return resolve(res.data);
        }).catch(((err) => {
            return reject(err);
        }));
    });
}
export default apiRequest