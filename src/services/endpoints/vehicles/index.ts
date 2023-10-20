import { IHistory, IVehicle } from '../../../store/vehicles/interfaces';
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

class VehiclesService {
  static async getAll(): Promise<IVehicle[]> {
    return (await http.get('/vehicles')).data;
  }

  static async createVehicle(vehicleInfo: IVehicle): Promise<IVehicleResponse> {
    return await http.post('/vehicles', vehicleInfo);
  }

  static async updateVehicle(
    vehicleId: string,
    vehicleInfo: IVehicle,
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
