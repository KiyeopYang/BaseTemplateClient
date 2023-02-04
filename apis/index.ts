import axios from 'axios';
import { StoreKey } from 'types';
import user from './user';
import artist from './artist';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

const getJwt = () =>
  typeof window === 'undefined'
    ? null
    : window.localStorage.getItem(StoreKey.Jwt);

request.interceptors.request.use(
  function (config) {
    const jwt = getJwt();
    if (jwt) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${jwt}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const upload = async (value): Promise<any> => {
  const form = new FormData();
  form.append('files', value, '1.png');

  const { data } = await request.post('/api/upload', form);
  return data[0];
};

const apis = {
  user,
  upload,
  artist,
};

export { apis, getJwt, request };
