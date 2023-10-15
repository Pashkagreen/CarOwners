import { makeAutoObservable, runInAction } from 'mobx';

import UserService from '../../services/user';

import { flashMessage } from '../../core/utils';

import { validateObject } from '../../types';
import { FetchState } from '../Vehicles/types';
import { User, UserData } from './types';

export class UserStore {
  user: User = {
    uid: '',
    username: '',
    phoneNumber: '',
    email: '',
    countryCode: 'us',
    isAuthorized: false,
    headerHeight: 0,
  };
  state: FetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  updateHeaderHeight = (height: number): void => {
    this.user = { ...this.user, headerHeight: height };
  };

  updateState = (state: FetchState): void => {
    this.state = state;
  };

  setUserData(newUserInfo: UserData): void {
    this.user = { ...this.user, ...newUserInfo };
  }

  async getAndSetAuthUser(uid: string): Promise<void> {
    this.updateState('pending');

    const { data } = await UserService.getUserData();

    try {
      if (data) {
        const userData = {
          uid,
          username: data.username,
          phoneNumber: data.phoneNumber,
          email: data?.email || '',
        };

        runInAction(() => {
          this.setUserData(userData);
          this.updateAuthStatus(true);
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async registerUser(
    phoneNumber: validateObject,
    username: validateObject,
  ): Promise<void> {
    this.updateState('pending');

    try {
      const { data } = await UserService.registration({
        phoneNumber: phoneNumber.value,
        username: username.value,
      });

      if (data) {
        const userData = {
          uid: data.uid,
          username: data.username,
          phoneNumber: data.phoneNumber,
        };

        runInAction(() => {
          this.setUserData(userData);
          this.updateAuthStatus(true);
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  async updateUser(newUserInfo: UserData): Promise<void> {
    this.updateState('pending');

    try {
      const { data } = await UserService.updateUser(newUserInfo);

      if (data) {
        flashMessage({
          message: 'Success!',
          type: 'success',
          description: 'Your profile information was updated.',
        });
        runInAction(() => {
          this.setUserData(data);
          this.updateAuthStatus(true);
        });
      } else {
        runInAction(() => {
          this.setUserData(this.user);
        });
      }
    } catch (e) {
      this.updateState('error');
    }

    this.updateState('done');
  }

  updateUserCountry(country: string): void {
    this.user = { ...this.user, countryCode: country };
  }

  updateAuthStatus(isAuthorized: boolean): void {
    this.user = { ...this.user, isAuthorized: isAuthorized };
  }

  clearUser(): void {
    this.user = {
      uid: '',
      username: '',
      phoneNumber: '',
      email: '',
      countryCode: 'us',
      isAuthorized: false,
      headerHeight: 0,
    };
  }
}
