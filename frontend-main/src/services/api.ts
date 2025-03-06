import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from 'next-auth/jwt';

const serviceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 파라미터 직렬화
serviceApi.defaults.paramsSerializer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: (paramObj: { [key: string]: any }) => {
    const params = new URLSearchParams();

    Object.entries(paramObj).forEach(([key, value]) => {
      if (value) {
        if (typeof value === 'string' || typeof value === 'number') {
          params.append(key, value.toString());
        }
        if (Array.isArray(value) && value.length !== 0) {
          params.append(key, value.join(','));
        }
      }
    });

    return params.toString();
  },
};

// 요청 인터셉터
serviceApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    //header에 토큰 추가
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['authorization'] = `${token}`;
    }
    return {
      ...config,
    };
  },
);

// 응답 인터셉터
serviceApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// request transform
serviceApi.defaults.transformRequest = [
  (data: unknown, headers: unknown) => {
    if (headers['Content-Type'] === 'multipart/form-data') {
      return data;
    }
    return JSON.stringify(data);
  },
];

export default serviceApi;
