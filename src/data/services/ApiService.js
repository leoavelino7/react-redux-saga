const URL = "http://localhost:3002/api/react-redux-saga/";

export const ApiService = {
    get(endpoint) {
        return fetch(`${URL}${endpoint}`)
            .then(response => response.json());
    },
    post(endpoint, data) {
        return fetch(`${URL}${endpoint}`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => response.json());
    },
    put(endpoint, data) {
        return fetch(`${URL}${endpoint}?id=${data.id}`, {
                method: "PUT",
                body: JSON.stringify(data)
            })
            .then(response => response.json());
    },
    delete(endpoint, id) {
        return fetch(`${URL}${endpoint}?id=${id}`, {
                method: "DELETE"
            })
            .then(response => response.json());
    }
}