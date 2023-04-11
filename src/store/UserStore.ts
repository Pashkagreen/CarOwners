import {makeAutoObservable} from 'mobx';

export interface IUser {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
  isAuthorized: boolean;
  email: string;
}

export interface IUserUpdate {
  uid: string;
  username: string;
  phoneNumber: string;
  email?: string;
}

export class UserStore {
  user: IUser = {
    uid: '',
    username: '',
    phoneNumber: '',
    email: '',
    countryCode: 'us',
    isAuthorized: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateUser(newUserInfo: IUserUpdate) {
    this.user = {...this.user, ...newUserInfo};
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
