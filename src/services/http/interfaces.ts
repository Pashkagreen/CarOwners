import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { MessageType } from 'react-native-flash-message';

interface IAdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export enum StatusCodes {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL = 500,
  NOT_FOUND = 404,
}

interface IStatusCodeBody {
  type: MessageType;
  message: string;
}

interface IBaseError {
  message: string;
}

type TStatusCodeType = Record<number, IStatusCodeBody>;

interface IServerSuccess {
  message: string;
}

export const StatusCode: TStatusCodeType = {
  [StatusCodes.UNAUTHORIZED]: {
    type: 'danger',
    message: 'Unauthorized request!',
  },
  [StatusCodes.FORBIDDEN]: {
    type: 'danger',
    message: 'Forbidden request!',
  },
  [StatusCodes.INTERNAL]: {
    type: 'danger',
    message: 'Internal server error!',
  },
  [StatusCodes.NOT_FOUND]: {
    type: 'danger',
    message: 'Requested source not found!',
  },
};

export type {
  IAdaptAxiosRequestConfig,
  IBaseError,
  IStatusCodeBody,
  TStatusCodeType,
  IServerSuccess,
};
