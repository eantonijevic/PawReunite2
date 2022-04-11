const AuthProvider = {
    isAuthenticated: false,
    signIn: (callback) => {
        AuthProvider.isAuthenticated = true;
        setTimeout(callback, 100);
    },
    signOut: (callback) => {
        AuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
    getToken: () => {
        const tokenString = sessionStorage.getItem('token');

        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken.token
        }
    },
    removeToken: () => {
        sessionStorage.removeItem('token');
    }
};

const useAuthProvider = () => AuthProvider

export {useAuthProvider};
