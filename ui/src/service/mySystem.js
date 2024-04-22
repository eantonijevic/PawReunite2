const restApiEndpoint = "http://localhost:4321"

const MySystem = {
    login: (credentials, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(resp => {
            if (resp.status === 201) {
                resp.json().then(body => okCallback(body))
            } else {
                errorCallback("Invalid user or password")
            }
        }).catch(e => errorCallback("Unable to connect to My System API"))
    },

    register: (user, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },

    listUsers: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(users => okCallback(users))
            } else {
                errorCallback()
            }
        })
    },

    deleteUser: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 204) {
                okCallback();
            } else {
                errorCallback();
            }
        });
    },

    registerpet: (lostPet, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/registerpet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lostPet)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },

    listLostPets: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/lostpets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(lostPets => okCallback(lostPets))
            } else {
                errorCallback()
            }
        })
    },
};

const useMySystem = () => MySystem

export {useMySystem};
