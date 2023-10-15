import { ReactNativeFirebase } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import md5 from 'md5';

import { SourceType } from '../components/ProgressiveImage';

type UploadImageType = Omit<SourceType, 'filename'>;

export class Storage {
  static async uploadImage(
    photoSource: UploadImageType,
    name: string,
    onComplete: (url: string) => void,
    setFileName: (filename: string) => void,
    onChangeLoading: (progress: number) => void,
    onError: (error: ReactNativeFirebase.NativeFirebaseError) => void,
    onStartOnFinish: (state: boolean) => void,
  ): Promise<void> {
    onStartOnFinish(true);
    if (!photoSource) {
      onStartOnFinish(false);
      return;
    }

    const fileName = md5(String(new Date().getTime())) + name;
    const ref = storage().ref('cars/' + fileName);

    const task = ref.putFile(photoSource.path, {
      cacheControl: 'public',
    });

    task.on(
      'state_changed',
      snapshot => {
        const procent = snapshot.totalBytes / 100;
        const progress = snapshot.bytesTransferred / procent;
        onChangeLoading && onChangeLoading(progress);
      },
      error => onError && onError(error),
      () => {
        ref.getDownloadURL().then(url => {
          onStartOnFinish(false);
          setFileName(fileName);
          onComplete && onComplete(url);
        });
      },
    );
  }

  static async deleteImage(fileName: string): Promise<void> {
    const ref = storage().ref('cars/' + fileName);

    ref.delete().then(() => {
      console.log(`${fileName} has been deleted successfully.`);
    });
  }
}
