import { createContext, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncTrunk } from 'mobx-sync';

import { UserStore } from './User';
import { VehiclesStore } from './Vehicles';

export class RootStore {
  userStore: UserStore;
  vehiclesStore: VehiclesStore;

  constructor() {
    this.vehiclesStore = new VehiclesStore();
    this.userStore = new UserStore();
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
