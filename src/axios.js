import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-borrowedlens.firebaseio.com',
});

export default instance;
