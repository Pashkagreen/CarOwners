import {makeAutoObservable, runInAction} from 'mobx';

import UserService from '../services/user';

import {flashMessage} from '../core/utils';

import {fetchState} from './VehiclesStore';

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
    this.user = {...this.user, ...newUserInfo};
  }

  async updateUser(newUserInfo: UserUpdate) {
    this.updateState('pending');

    try {
      const {data} = await UserService.updateUser(newUserInfo);

      if (data) {
        flashMessage({
          message: 'Success!',
          type: 'success',
          description: 'Your profile information was updated.',
        });
        runInAction(() => {
          this.setUserData(data);
        });
      }
    } catch (err) {
      this.updateState('error');
      flashMessage({
        message: 'Error!',
        type: 'danger',
        description: 'Unknown error occured.',
      });
    }

    this.updateState('done');
  }

  updateUserCountry(country: string) {
    this.user = {...this.user, countryCode: country};
  }

  updateAuthStatus(isAuthorized: boolean) {
    this.user = {...this.user, isAuthorized: isAuthorized};
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
