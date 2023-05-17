import { HistoryInterface, VehicleInterface } from '../store/Vehicles/types';
import { http } from './http';
import { ServerSuccessInterface } from './types';

interface ServerVehicleInterface {
  data: VehicleInterface;
}

interface ServerHistoryInterface {
  data: {
    history: HistoryInterface[];
  };
}

class VehiclesService {
  static async getAll(): Promise<VehicleInterface[]> {
    return (await http.get('/vehicles')).data;
  }

  static async createVehicle(
    vehicleInfo: VehicleInterface,
  ): Promise<ServerVehicleInterface> {
    return await http.post('/vehicles', vehicleInfo);
  }

  static async updateVehicle(
    vehicleId: string | undefined,
    vehicleInfo: VehicleInterface,
  ): Promise<ServerVehicleInterface> {
    return await http.patch(`/vehicles/${vehicleId}`, vehicleInfo);
  }

  static async deleteVehicle(
    vehicleId: string | undefined,
  ): Promise<ServerSuccessInterface> {
    return await http.delete(`/vehicles/${vehicleId}`);
  }

  static async getAllHistory(): Promise<ServerHistoryInterface> {
    return await http.get('/history');
  }
}

export default VehiclesService;
