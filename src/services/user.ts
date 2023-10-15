import { UserData } from '../store/User/types';
import { http } from './http';
import { ServerSuccessInterface } from './types.http';

interface ServerUserInterface {
  data: UserData;
}

interface ServerCheckPhoneInterface {
  data: ServerSuccessInterface;
}

type UserRegistrationInterface = Omit<UserData, 'uid' | 'email'>;
class UserService {
  static async verifyPhoneNumber(
    phoneNumber: string,
  ): Promise<ServerCheckPhoneInterface> {
    return await http.post('/users/checkPhone', {
      phoneNumber,
    });
  }

  static async getUserData(): Promise<ServerUserInterface> {
    return await http.get('/users/getInfo');
  }

  static async registration(
    user: UserRegistrationInterface,
  ): Promise<ServerUserInterface> {
    return await http.post('/users/registration', user);
  }

  static async updateUser(user: UserData): Promise<ServerUserInterface> {
    return await http.patch(`/users`, user);
  }
}
export default UserService;
