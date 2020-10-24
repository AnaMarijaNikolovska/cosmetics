import axios from 'axios';

const accountToken = JSON.parse(sessionStorage.getItem('accountToken'));

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: accountToken,
    }
});

export default instance;