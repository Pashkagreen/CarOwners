import { makeAutoObservable, runInAction } from 'mobx';

import VehiclesService from '../../services/endpoints/vehicles';

import { flashMessage } from '../../core/utils';

import { TFetchState } from '../../types';
import { IHistory, IVehicle } from './interfaces';

export class VehiclesStore {
  public vehicles: IVehicle[] = [];

  public history: IHistory[] = [];

  public state: TFetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  public getVehicles = async (force?: boolean): Promise<void> => {
    if (!force) {
      this.setState('pending');
    }

    try {
      const data: IVehicle[] = await VehiclesService.getAll();

      if (!data?.length) {
        return;
      }

      this.setVehicles(data);
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  public getVehiclesHistory = async (force?: boolean): Promise<void> => {
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

  public createVehicle = async (newData: IVehicle): Promise<void> => {
    this.setState('pending');

    try {
      const { data } = await VehiclesService.createVehicle(newData);

      if (data?.id) {
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
  };

  public updateVehicle = async (
    vehicleId: string,
    newData: IVehicle,
  ): Promise<void> => {
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
          this.vehicles.map(i => (i.id === vehicleId ? { ...data } : i)),
        );
      }
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  public deleteVehicle = async (item: IVehicle): Promise<void> => {
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
  };

  public clearVehicles = (): void => {
    this.setHistory([]);
    this.setVehicles([]);
    this.setState('done');
  };

  public setState = (state: TFetchState): void => {
    this.state = state;
  };

  public setVehicles = (items: IVehicle[]): void => {
    this.vehicles = items;
  };

  public setHistory = (items: IHistory[]): void => {
    this.history = items;
  };
}
