import decode from 'jwt-decode';
import APPLLO_CLIENT from './ApolloClientService'
import * as query from '../constants/index.js'

 class AuthService {

    static _instance = null;

    static getInstance() {
        if (AuthService._instance == null) {
            AuthService._instance = new AuthService();
        }

        return this._instance;
    }
    // Initializing important variables
    constructor() {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {

        console.log(email, password);

        return APPLLO_CLIENT.mutate({
            mutation: query.AUTHENTICATE_USER,
            variables: {
                email:email,
                password: password
            }}
            ).then(result => {
            this.setToken(result.data); // Setting the token in localStorage
            return Promise.resolve(result);
        });


    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();// GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(loginData) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', loginData.loginUser.token)
        localStorage.setItem('login_user', JSON.stringify(loginData.loginUser))

    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('login_user')
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    getLoginUser(){
        return JSON.parse(localStorage.getItem('login_user'));
    }
}
const instanceAuthService = AuthService.getInstance();
export default instanceAuthService;
