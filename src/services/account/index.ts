import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export class Account {
  static async getUid(): Promise<string | null> {
    const user = auth().currentUser;
    if (!user) {
      return null;
    }

    return user.uid;
  }

  static async getToken(): Promise<string | null> {
    const token = await auth().currentUser?.getIdToken();
    if (!token) {
      return null;
    }

    return token;
  }

  static async signInWithPhoneNumber(
    phone: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return auth().signInWithPhoneNumber(phone);
  }
}
