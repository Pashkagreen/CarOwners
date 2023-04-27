interface User {
  uid: string;
  username: string;
  phoneNumber: string;
  countryCode: string;
  isAuthorized: boolean;
  email: string;
}

interface UserUpdate {
  uid: string;
  username: string;
  phoneNumber: string;
  email?: string;
}

export type { User, UserUpdate };
