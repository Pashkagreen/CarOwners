import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { MessageType } from 'react-native-flash-message';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export enum StatusCodes {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL = 500,
}

interface StatusCodeBody {
  type: MessageType;
  message: string;
}

interface BaseError {
  message: string;
}

type StatusCodeType = Record<number, StatusCodeBody>;

interface ServerSuccessInterface {
  message: string;
}

export type {
  AdaptAxiosRequestConfig,
  BaseError,
  StatusCodeBody,
  StatusCodeType,
  ServerSuccessInterface,
};
