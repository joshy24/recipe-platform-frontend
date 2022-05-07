import axios from 'axios';

import decode from 'jwt-decode'

const login_url = '/api/v1/admin/login'
const logout_url = '/api/va/admin/logout'

export default class AuthHelperMethods{

    login = (username, password) => {
        return  this.axios(login_url, {username,password}, "post")
                    .then(res => {
                        this.setToken(res.data.data.token); 
                        this.setAdmin(res.data.data.admin)
                        return res.data;
                    })
                    .catch(err => {
                        return "error";
                    })
    }

    signup = (email, firstname, lastname, business_name, password, password_again) => {
        return  this.axios(signup_url, {email,password,password_again,firstname, lastname, business_name}, "post")
                    .then(res => {
                        this.setToken(res.data.token); 
                        this.setAdmin(res.data.business)
                        return res;
                    })
                    .catch(err => {
                        console.log(err);
                        return "error";
                    })
    }

    logoutAPI = () => {
        // Clear user token and profile data from localStorage
        return this.axios(logout_url, {}, "post")
            .then(res => {
                this.logout()
                return true;
            })
            .catch(err => {
                return false
            })
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired.
            return true;
            } else return false;
        } catch (err) {
            this.logout()
            console.log("expired check failed!");
            return false;
        }
    };

    setAdmin = admin => {
        localStorage.setItem("admin", JSON.stringify(admin));
    }

    getAdmin = () => {
        var admin = localStorage.getItem("admin");

        if(admin){
            return JSON.parse(admin)
        }

        return {}
    }

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    };

    logout = () => {
        localStorage.removeItem("id_token");
        localStorage.removeItem("admin");
    };

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
        
        return answer;
    };
    
    axios = (url, data, method) => {
        // performs api calls sending the required authentication headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : 'https://virtualvisitsng.com',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

        if(typeof window !== 'undefined'){//if we are on the browser then attach the token
            if (this.loggedIn()) {
                headers["Authorization"] = "Bearer:" + this.getToken();
            }
        }
        
        return axios({
            url:url,
            method: method,
            data: method === "get" ? {}: data, 
            params: method ? data: {},
            //baseURL: 'http://localhost:3999',
            baseURL: 'https://apc-api-ng.herokuapp.com',
            timeout: 30000,
            headers: headers,
            withCredentials: false,
        })
        .then(this._checkStatus)
        .then(response => response )
        .catch(err => { 
            if(err.response.data == "Bad Request Token" || err.response.data == "Expired Token"){
                this.logout();
            }
            throw new Error(err);
        })
    };

    _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

}