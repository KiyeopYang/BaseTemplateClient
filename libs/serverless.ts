import axios from 'axios';

const request = axios.create({
  baseURL: 'https://9dy5vm7r0b.execute-api.us-east-1.amazonaws.com/prod',
});
export default request;
