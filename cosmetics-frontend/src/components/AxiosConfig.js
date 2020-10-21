import axios from 'axios';

const userToken = JSON.parse(sessionStorage.getItem('user'));

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: userToken,
    }
});

export default instance;