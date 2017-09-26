const request = (url, data) => {
    return fetch(url, data)
    .then((response) => {
        return response.json();
    });
}
export default {
    post: (url, data) => {
        return request(url, {
            ...data,
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    },
    get: (url, data) => {
        return request(url, {...data, method: 'GET', credentials: 'include'});
    }
}
