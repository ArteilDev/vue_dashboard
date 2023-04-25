import axios from 'axios';

const baseURL = 'https://api.jsonbin.io/v3/b/'

export {
  baseURL
};

const $http = axios.create({
  baseURL,
});

$http.defaults.headers.common['X-MASTER-KEY'] = '$2b$10$utavd3uqYdBhNdLNcWkZ0everlm3DUR/7X9l/KKcjC4.qcWurHvmW';

export default $http;
