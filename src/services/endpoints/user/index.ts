import { IUserData } from '@stores/user/interfaces';

import { http } from '../../http';
import { IServerSuccess } from '../../http/interfaces';

interface IUserResponse {
  data: IUserData;
}

interface ICheckPhoneResponse {
  data: IServerSuccess;
}

type TUserRegistration = Omit<IUserData, 'uid' | 'email'>;

class UserService {
  static async verifyPhoneNumber(
    phoneNumber: string,
  ): Promise<ICheckPhoneResponse> {
    return await http.post('/users/checkPhone', {
      phoneNumber,
    });
  }

  static async getUserData(): Promise<IUserResponse> {
    return await http.get('/users/getInfo');
  }

  static async registration(user: TUserRegistration): Promise<IUserResponse> {
    return await http.post('/users/registration', user);
  }

  static async updateUser(user: IUserData): Promise<IUserResponse> {
    return await http.patch(`/users`, user);
  }
}
export default UserService;
