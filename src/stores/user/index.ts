import UserService from '@services/endpoints/user';
import { IValidateObject, TFetchState } from '@types';
import { flashMessage } from '@utils';
import { makeAutoObservable, runInAction } from 'mobx';

import { IUser, IUserData } from './interfaces';

export class UserStore {
  /**
   * Main user entity
   */
  public user: IUser = {
    uid: '',
    username: '',
    phoneNumber: '',
    email: '',
    countryCode: 'us',
    isAuthorized: false,
    headerHeight: 0,
  };

  /**
   * Fetching state
   */
  public state: TFetchState = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  public getAndSetAuthUser = async (uid: string): Promise<void> => {
    this.setState('pending');

    const { data } = await UserService.getUserData();

    const { username, phoneNumber, email } = data ?? {};

    try {
      runInAction(() => {
        this.setUserData({
          uid,
          username,
          phoneNumber,
          email: email || '',
        });
        this.setAuthStatus(true);
      });
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  public registerUser = async (
    phone: IValidateObject,
    name: IValidateObject,
  ): Promise<void> => {
    this.setState('pending');

    try {
      const { data } = await UserService.registration({
        phoneNumber: phone.value,
        username: name.value,
      });

      const { uid, username, phoneNumber } = data ?? {};

      runInAction(() => {
        this.setUserData({
          uid,
          username,
          phoneNumber,
        });
        this.setAuthStatus(true);
      });
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  public updateUser = async (newUserInfo: IUserData): Promise<void> => {
    this.setState('pending');

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
          this.setAuthStatus(true);
        });
      } else {
        runInAction(() => {
          this.setUserData(this.user);
        });
      }
    } catch (e) {
      this.setState('error');
    }

    this.setState('done');
  };

  public clearUser = (): void => {
    this.user = {
      uid: '',
      username: '',
      phoneNumber: '',
      email: '',
      countryCode: 'us',
      isAuthorized: false,
      headerHeight: 0,
    };
  };

  public updateHeaderHeight = (height: number): void => {
    this.user = { ...this.user, headerHeight: height };
  };

  public setUserCountry = (country: string): void => {
    this.user = { ...this.user, countryCode: country };
  };

  public setAuthStatus = (isAuthorized: boolean): void => {
    this.user = { ...this.user, isAuthorized: isAuthorized };
  };

  public setState = (state: TFetchState): void => {
    this.state = state;
  };

  public setUserData = (newUserInfo: IUserData): void => {
    this.user = { ...this.user, ...newUserInfo };
  };
}
