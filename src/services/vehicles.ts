import {http} from './http';

export interface VehicleInfoInterface {
  id?: string;
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  price?: string;
  createdAt?: Date;
}
class VehiclesService {
  static async getAll(): Promise<VehicleInfoInterface[]> {
    return (await http.get('/vehicles')).data;
  }

  static async createVehicle(vehicleInfo: VehicleInfoInterface): Promise<any> {
    return await http.post('/vehicles/create', vehicleInfo);
  }

  static async updateVehicle(
    vehicleId: string | undefined,
    vehicleInfo: VehicleInfoInterface,
  ): Promise<any> {
    return await http.put(`/vehicles/update/${vehicleId}`, vehicleInfo);
  }

  static async deleteVehicle(vehicleId: string | undefined): Promise<any> {
    return await http.delete(`/vehicles/delete/${vehicleId}`);
  }

  static async getAllHistory(): Promise<any> {
    return await http.get('/vehicles/history');
  }
}

export default VehiclesService;
