import axios from "axios";

const instance = axios.create({
    baseURL: 'https://my-burger-470cf.firebaseio.com/'
});


export default instance;
