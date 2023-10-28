import { flashMessage } from '@utils';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { Account } from '../account';
import { IAdaptAxiosRequestConfig, IBaseError, StatusCode } from './interfaces';

const BASE_URL =
  'https://us-central1-carowners-97d56.cloudfunctions.net/api/v1';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

/**
 * We can use the following function to inject the JWT token through an interceptor
 */
const injectToken = async (
  config: IAdaptAxiosRequestConfig,
): Promise<IAdaptAxiosRequestConfig> => {
  try {
    const token = await Account.getToken();

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return config;
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: BASE_URL,
      headers,
      withCredentials: true,
    });

    http.interceptors.request.use(injectToken, error => Promise.reject(error));

    http.interceptors.response.use(
      response => response,
      error => this.handleError(error),
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: AxiosError<IBaseError>) {
    const { response } = error;
    const status = response?.status;
    const data = response?.data;

    if (status && StatusCode[status]) {
      flashMessage({
        type: StatusCode[status].type,
        message: StatusCode[status].message,
        description: data?.message,
      });
    } else if (status) {
      flashMessage({
        type: 'danger',
        message: 'Error!',
        description: 'Unexpected error occurred.',
      });
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
