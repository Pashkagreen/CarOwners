import {http} from './http';

export type User = {
  uid?: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
};

class UserService {
  static async verifyPhoneNumber(phoneNumber: string): Promise<any> {
    return await http.post('/users/checkPhone', {
      phoneNumber,
    });
  }

  static async getUserData(): Promise<any> {
    return await http.get<User, any>('/users/getInfo');
  }

  static async registration(user: User): Promise<any> {
    return await http.post<User, any>('/users/registration', user);
  }

  static async updateUser(user: User): Promise<any> {
    return await http.put<User, any>(`/users/update`, user);
  }
}
export default UserService;
