import { makeAutoObservable, runInAction } from 'mobx';

import VehiclesService from '../services/vehicles';

import { flashMessage } from '../core/utils';

export type fetchState = 'pending' | 'done' | 'error';

type modifiedAt = {
  _nanoseconds: number;
  _seconds: number;
};

type historyData = {
  create: modifiedAt;
  update?: modifiedAt;
  delete: modifiedAt;
};

export interface HistoryInterface {
  id: string;
  data: historyData;
}

export interface VehicleInterface {
  id: string;
  brand?: string;
  model?: string;
  year?: string | number;
  price?: string | number;
  mileage?: string | number;
  createdAt?: modifiedAt;
}

export class VehiclesStore {
  vehicles: VehicleInterface[] = [];
  history: HistoryInterface[] = [];
  state: fetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  updateState = (state: fetchState) => {
    this.state = state;
  };

  clearVehicles() {
    this.history = [];
    this.vehicles = [];
    this.state = 'done';
  }

  async getVehicles(force: boolean): Promise<void> {
    if (!force) {
      this.updateState('pending');
    }

    try {
      const data: VehicleInterface[] = await VehiclesService.getAll();

      if (data) {
        runInAction(() => {
          this.vehicles = data;
        });
      } else {
        runInAction(() => {
          this.vehicles = [];
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async getVehiclesHistory(force?: boolean): Promise<void> {
    if (!force) {
      this.updateState('pending');
    }

    try {
      const { data } = await VehiclesService.getAllHistory();

      if (data) {
        runInAction(() => {
          this.history = data.history;
        });
      } else {
        runInAction(() => {
          this.history = [];
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async createVehicle(newData: VehicleInterface): Promise<void> {
    this.updateState('pending');

    try {
      const { data } = await VehiclesService.createVehicle(newData);

      if (data.id) {
        flashMessage({
          type: 'success',
          message: 'Congratulations!',
          description: 'You successfully added a vehicle.',
        });
        runInAction(() => {
          this.vehicles.unshift(data);
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async updateVehicle(
    vehicleId: string | undefined,
    newData: VehicleInterface,
  ): Promise<void> {
    this.updateState('pending');

    try {
      const { data } = await VehiclesService.updateVehicle(vehicleId, newData);

      if (data.id) {
        flashMessage({
          type: 'success',
          message: 'Congratulations!',
          description: 'You successfully updated a vehicle info.',
        });
        runInAction(() => {
          const newArray = this.vehicles.map(i =>
            i.id === vehicleId ? (i = { ...data }) : i,
          );

          this.vehicles = newArray;
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async deleteVehicle(item: any): Promise<void> {
    try {
      await VehiclesService.deleteVehicle(item?.id);
      flashMessage({
        type: 'info',
        message: 'Your vehicle deleted.',
      });
      runInAction(() => {
        const newArray = this.vehicles.filter(e => e.id !== item?.id);
        this.vehicles = newArray;
      });
    } catch (e) {
      this.updateState('error');
    }
  }
}
