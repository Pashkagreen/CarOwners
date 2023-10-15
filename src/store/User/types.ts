interface User {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
  isAuthorized: boolean;
  email: string;
  headerHeight: number;
}

interface UserData {
  uid: string;
  username: string;
  phoneNumber: string;
  email?: string;
}

export type { User, UserData };
