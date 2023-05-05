import axios, { AxiosRequestConfig } from 'axios';

export const createHttp = (baseURL: string | undefined) => {
  const options: AxiosRequestConfig = {
    baseURL: baseURL,
  };

  const http = axios.create(options);

  const attachCookieToHeaders = (): string => {
    return '';
  };

  // Add a request interceptor
  http.interceptors.request.use(
    async (config: any) => {
      if (config.url != '/login' && config.baseURL != null) {
        try {
          let accessToken = attachCookieToHeaders();

          config.headers['Authorization'] = accessToken || '';
          config.headers = config.headers || {};
        } catch (e) {
          console.log(e);
        }
      }

      // Do something before request is sent
      return config;
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  http.interceptors.response.use(
    (response: any) => {
      // Do something with response data
      return response.data;
    },
    (error: any) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return http;
};
