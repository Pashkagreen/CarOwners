import { SetPhotos } from '../../screens/Main/AddVehicle/AddVehicleContainer';

type FetchState = 'pending' | 'done' | 'error';

interface ModifiedAt {
  _nanoseconds: number;
  _seconds: number;
}

interface HistoryData {
  create: ModifiedAt;
  update?: ModifiedAt;
  delete: ModifiedAt;
}

interface HistoryInterface {
  id: string;
  data: HistoryData[];
}

interface VehicleInterface {
  id?: string;
  brand?: string;
  model?: string;
  year?: string | number;
  price?: string | number;
  mileage?: string | number;
  createdAt?: ModifiedAt;
  photos?: SetPhotos[] | [];
}

export type {
  FetchState,
  ModifiedAt,
  HistoryData,
  HistoryInterface,
  VehicleInterface,
};
