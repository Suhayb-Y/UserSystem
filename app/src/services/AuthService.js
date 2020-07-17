import axios from "axios";

class AuthService {
    constructor() {
        this.user = {};
        this.authenticated = false;
    }

    load(token) {
        return axios.post('/api/users/jwt/verify', {token}).then(res => {
            this.user = res.data.data;
            this.authenticated = true;
        });
    }

    login(user) {
        return axios.post('/api/users/login', user).then(res => {
            //Save to local storage:
            window.localStorage.setItem('token', res.data.token);
            return res.data;
        });
    }

    logout() {
        this.authenticated = false;
        window.localStorage.removeItem("token");
    }

    register(user) {
        return axios.post('/api/users/register', user);
    }
}

export default new AuthService();