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

    deletePet: (token, petId, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/lostpets/${petId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(resp => {
                if (resp.ok) {
                    okCallback();
                } else {
                    errorCallback(new Error(`HTTP ${resp.status} - ${resp.statusText}`));
                }
            })
            .catch(error => {
                errorCallback(error);
            });
    },

    deleteCurrentPet: (token, petId, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/currentpets/${petId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(resp => {
                if (resp.ok) {
                    okCallback();
                } else {
                    errorCallback(new Error(`HTTP ${resp.status} - ${resp.statusText}`));
                }
            })
            .catch(error => {
                errorCallback(error);
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

    registerCurrentPet: (currentPet, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/registercurrentpet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentPet)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },

    getPet: (token, petId, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/lostpets/${petId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(pet => okCallback(pet));
            } else {
                errorCallback();
            }
        }).catch(e => errorCallback("Unable to connect to My System API"));
    },

    getCurrentPet: (token, petId, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/currentpets/${petId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(pet => okCallback(pet));
            } else {
                errorCallback();
            }
        }).catch(e => errorCallback("Unable to connect to My System API"));
    },

    updatePet: (token, pet, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/lostpets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(pet)
        }).then(resp => {
            if (resp.status === 200) {
                okCallback();
            } else {
                errorCallback();
            }
        }).catch(e => errorCallback("Unable to connect to My System API"));
    },

    updateCurrentPet: (token, pet, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/currentpets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(pet)
        }).then(resp => {
            if (resp.status === 200) {
                okCallback();
            } else {
                errorCallback();
            }
        }).catch(e => errorCallback("Unable to connect to My System API"));
    },

    listLostPets: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/lostpets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(lostPets => okCallback(lostPets))
            } else {
                errorCallback()
            }
        })
    },

    listCurrentPets: (token, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/currentpets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => {
            if (resp.status === 200) {
                resp.json().then(lostPets => okCallback(lostPets))
            } else {
                errorCallback()
            }
        })
    },

    Kennel_create: (Kennel, okCallback, errorCallback) => {
        fetch(`${restApiEndpoint}/Kennel_create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Kennel)
        }).then(resp => {
            if (resp.status === 201) {
                okCallback()
            } else {
                errorCallback()
            }
        })
    },
    Kennel_login: (credentials, okCallback, errorCallback) => {
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
};

const useMySystem = () => MySystem

export {useMySystem};
