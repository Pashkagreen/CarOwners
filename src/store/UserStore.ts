import { makeAutoObservable, runInAction } from 'mobx';

import UserService from '../services/user';

import { flashMessage } from '../core/utils';

import { validateObject } from '../screens/auth/login/loginView';
import { fetchState } from './VehiclesStore';

export interface User {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
  isAuthorized: boolean;
  email: string;
}

export interface UserUpdate {
  uid: string;
  username: string;
  phoneNumber: string;
  email?: string;
}

export class UserStore {
  user: User = {
    uid: '',
    username: '',
    phoneNumber: '',
    email: '',
    countryCode: 'us',
    isAuthorized: false,
  };
  state: fetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  updateState = (state: fetchState) => {
    this.state = state;
  };

  setUserData(newUserInfo: UserUpdate) {
    this.user = { ...this.user, ...newUserInfo };
  }

  async getAndSetAuthUser(uid: string) {
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

  async registerUser(phoneNumber: validateObject, username: validateObject) {
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

  async updateUser(newUserInfo: UserUpdate) {
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

  updateUserCountry(country: string) {
    this.user = { ...this.user, countryCode: country };
  }

  updateAuthStatus(isAuthorized: boolean) {
    this.user = { ...this.user, isAuthorized: isAuthorized };
  }

  clearUser() {
    this.user = {
      uid: '',
      username: '',
      phoneNumber: '',
      email: '',
      countryCode: 'us',
      isAuthorized: false,
    };
  }
}
