import { createContext, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncTrunk } from 'mobx-sync';

import { UserStore } from './user';
import { VehiclesStore } from './vehicles';

class RootStore {
  userStore: UserStore;
  vehiclesStore: VehiclesStore;

  constructor() {
    this.userStore = new UserStore();
    this.vehiclesStore = new VehiclesStore();
  }
}

export const rootStore = new RootStore();

const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export const rehydrate = async (): Promise<void> => {
  await trunk.init();
};

export const StoreContext = createContext(rootStore);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
