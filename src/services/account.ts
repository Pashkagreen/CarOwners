import AsyncStorage from '@react-native-async-storage/async-storage';
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

  static async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem('accessToken');
  }

  static async setAccessToken(token: string): Promise<void> {
    return await AsyncStorage.setItem('accessToken', token);
  }

  static async removeAccessToken(): Promise<void> {
    return await AsyncStorage.removeItem('accessToken');
  }
}
