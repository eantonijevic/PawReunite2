const AuthProvider = {
    getToken: () => {
        const tokenString = sessionStorage.getItem('token');

        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken.token
        }
    },
    removeToken: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
    }
};

const useAuthProvider = () => AuthProvider

export {useAuthProvider};
