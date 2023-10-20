interface IValidateObject {
  value: string;
  error: string;
}

type TFetchState = 'pending' | 'done' | 'error';

export type { IValidateObject, TFetchState };
