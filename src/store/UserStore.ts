import { makeAutoObservable } from 'mobx';

interface IUser {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
}

export class UserStore {
  user: IUser = {
    uid: '',
    username: '',
    phoneNumber: '',
    countryCode: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateUser(newUserInfo: IUser) {
    this.user = {...this.user, ...newUserInfo};
  }

  updateUserCountry(country: string) {
    this.user = {...this.user, countryCode: country}
  }

  clearUser() {
    this.user = {
      uid: '',
      username: '',
      phoneNumber: '',
      countryCode: ''
    };
  }
}


