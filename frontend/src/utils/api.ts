export async function downloadFile(){
    const token = JSON.parse(localStorage.getItem('JWT')!).accessToken;

    return fetch('http://localhost:5000/users/calendar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/blob',
            'Authorization': 'Bearer ' + token
        }
    }).then(resp => resp.blob());
}
