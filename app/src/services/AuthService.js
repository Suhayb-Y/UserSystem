import axios from "axios";

class AuthService {
    load() {
        return axios.get('/api/users/jwt/get').then(res => {
            this.authenticated = true;
            this.user = res.data;
        }, err => {
            console.log(err.response.data);
            this.authenticated = false;
        });
    }

    login(user) {
        return axios.post('/api/users/login', user).then(res => {
            this.authenticated = true;
            return res.data;
        });
    }

    logout() {
        this.authenticated = false;
        //Make API call to destroy cookie
    }

    register(user) {
        return axios.post('/api/users/register', user);
    }
}

export default new AuthService();