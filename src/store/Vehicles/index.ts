import { makeAutoObservable, runInAction } from 'mobx';

import VehiclesService from '../../services/vehicles';

import { flashMessage } from '../../core/utils';

import { FetchState, HistoryInterface, VehicleInterface } from './types';

export class VehiclesStore {
  vehicles: VehicleInterface[] = [];
  history: HistoryInterface[] = [];
  state: FetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  async getVehicles(force?: boolean): Promise<void> {
    if (!force) {
      this.setState('pending');
    }

    try {
      const data: VehicleInterface[] = await VehiclesService.getAll();

      if (!data?.length) {
        return;
      }

      this.setVehicles(data);
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  }

  getVehiclesHistory = async (force?: boolean): Promise<void> => {
    if (!force) {
      this.setState('pending');
    }

    try {
      const { data } = await VehiclesService.getAllHistory();

      if (!data?.history.length) {
        return;
      }

      this.setHistory(data.history);
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  async createVehicle(newData: VehicleInterface): Promise<void> {
    this.setState('pending');

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
      this.setState('error');
    }

    this.setState('done');
  }

  async updateVehicle(
    vehicleId: string | undefined,
    newData: VehicleInterface,
  ): Promise<void> {
    this.setState('pending');

    try {
      const { data } = await VehiclesService.updateVehicle(vehicleId, newData);

      if (data.id) {
        flashMessage({
          type: 'success',
          message: 'Congratulations!',
          description: 'You successfully updated a vehicle info.',
        });
        this.setVehicles(
          (this.vehicles = this.vehicles.map(i =>
            i.id === vehicleId ? { ...data } : i,
          )),
        );
      }
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  }

  async deleteVehicle(item: VehicleInterface): Promise<void> {
    try {
      await VehiclesService.deleteVehicle(item?.id);
      flashMessage({
        type: 'info',
        message: 'Your vehicle successfully deleted.',
      });

      this.setVehicles(this.vehicles.filter(e => e.id !== item?.id));
    } catch (e) {
      this.setState('error');
    }
  }

  public clearVehicles(): void {
    this.setHistory([]);
    this.setVehicles([]);
    this.setState('done');
  }

  public setState = (state: FetchState): void => {
    this.state = state;
  };

  public setVehicles = (items: VehicleInterface[]): void => {
    this.vehicles = items;
  };

  public setHistory = (items: HistoryInterface[]): void => {
    this.history = items;
  };
}
