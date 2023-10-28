import { IUploadedPhoto } from '@screens/Main/AddVehicle/AddVehicleContainer';
import { IHistory, IVehicle } from '@stores/vehicles/interfaces';

import { http } from '../../http';
import { IServerSuccess } from '../../http/interfaces';

interface IVehicleResponse {
  data: IVehicle;
}

interface IHistoryResponse {
  data: {
    history: IHistory[];
  };
}

export interface IVehicleCreate extends Omit<IVehicle, 'id'> {
  photos?: IUploadedPhoto[];
}

class VehiclesService {
  static async getAll(): Promise<IVehicle[]> {
    return (await http.get('/vehicles')).data;
  }

  static async createVehicle(
    vehicleInfo: IVehicleCreate,
  ): Promise<IVehicleResponse> {
    return await http.post('/vehicles', vehicleInfo);
  }

  static async updateVehicle(
    vehicleId: string,
    vehicleInfo: IVehicleCreate,
  ): Promise<IVehicleResponse> {
    return await http.patch(`/vehicles/${vehicleId}`, vehicleInfo);
  }

  static async deleteVehicle(vehicleId: string): Promise<IServerSuccess> {
    return await http.delete(`/vehicles/${vehicleId}`);
  }

  static async getAllHistory(): Promise<IHistoryResponse> {
    return await http.get('/history');
  }
}

export default VehiclesService;
