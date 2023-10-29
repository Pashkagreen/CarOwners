interface IUser {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
  isAuthorized: boolean;
  email: string;
  headerHeight: number;
}

interface IUserData extends Pick<IUser, 'uid' | 'username' | 'phoneNumber'> {
  email?: string;
}

export type { IUser, IUserData };
