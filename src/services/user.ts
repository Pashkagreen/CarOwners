import { http } from './http';
import { ServerSuccessInterface } from './types';

export type User = {
  uid: string;
  username: string;
  phoneNumber: string;
  email?: string;
};

interface ServerUserInterface {
  data: User;
}

type UserRegistrationInterface = Omit<User, 'uid' | 'email'>;
class UserService {
  static async verifyPhoneNumber(
    phoneNumber: string,
  ): Promise<ServerSuccessInterface> {
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

  static async updateUser(user: User): Promise<ServerUserInterface> {
    return await http.patch(`/users`, user);
  }
}
export default UserService;
