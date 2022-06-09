import {BASE_PATH} from "../api/base";

export async function downloadFile(){
    const token = JSON.parse(localStorage.getItem('JWT')!).accessToken;

    return fetch(BASE_PATH + "/users/calendar", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/blob',
            'Authorization': 'Bearer ' + token
        }
    }).then(resp => resp.blob());
}
