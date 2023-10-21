import { IUploadedPhoto } from '../../screens/Main/AddVehicle/AddVehicleContainer';

interface IModifiedAt {
  _nanoseconds: number;
  _seconds: number;
}

interface IHistoryRecord {
  create: IModifiedAt;
  update?: IModifiedAt;
  delete: IModifiedAt;
}

interface IHistory {
  id: string;
  data: IHistoryRecord;
}

interface IVehicle {
  id: string;
  brand?: string;
  model?: string;
  year?: string | number;
  price?: string | number;
  mileage?: string | number;
  createdAt?: IModifiedAt;
  photos?: IUploadedPhoto[] | [];
}

export type { IModifiedAt, IHistoryRecord, IHistory, IVehicle };
