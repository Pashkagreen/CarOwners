import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export class Account {
  static async getUid(): Promise<string | null> {
    const user = await auth().currentUser;
    if (user && user.uid) {
      return user.uid;
    }
    return null;
  }

  static async getToken(): Promise<string | null> {
    const token = await auth().currentUser?.getIdToken();
    if (token) {
      return token;
    }
    return null;
  }

  static async signInWithPhoneNumber(
    phone: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    const confirmation = await auth().signInWithPhoneNumber(phone);
    return confirmation;
  }
}
