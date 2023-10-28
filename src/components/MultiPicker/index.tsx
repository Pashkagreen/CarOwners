import React, { FC, memo, useState } from 'react';
import { Keyboard, View } from 'react-native';

import checkStoragePermissions from '@permissions';
import { IUploadedPhoto } from '@screens/Main/AddVehicle/AddVehicleContainer';
import { Storage } from '@services/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { Image as IImage } from 'react-native-image-crop-picker';
import { Text } from 'react-native-paper';

import GalleryCell from '../GalleryCell';
import Image from '../Image';
import { SourceType } from '../ProgressiveImage';
import styles from './style';

interface IMultiPicker {
  onFinishLoadPhotos: (photos: IUploadedPhoto[]) => void;
  onUploadPhotos: (photos: IImage[]) => void;
  text: string;
  defaultPhotos?: IUploadedPhoto[];
  showMode?: boolean;
}

const MultiPicker: FC<IMultiPicker> = ({
  onFinishLoadPhotos,
  onUploadPhotos,
  showMode,
  text,
  defaultPhotos,
}) => {
  const [localPhotos, setLocalPhotos] = useState<IUploadedPhoto[]>(
    defaultPhotos ?? [],
  );
  const [loading, setLoading] = useState(false);

  const maxFiles = 15 - localPhotos.length;

  const handleOpenPicker = async (): Promise<void> => {
    Keyboard.dismiss();

    try {
      setLoading(true);
      const check = await checkStoragePermissions();

      if (!check) {
        return;
      }

      const source = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        maxFiles: maxFiles,
        cropping: false,
      });

      const filteredSource = source.filter(
        (item, index, array) =>
          index === array.findIndex(el => el.path === item.path),
      );

      const filteredPhoto = filteredSource.filter(el =>
        localPhotos.every(photo => photo.path !== el.path),
      );

      onUploadPhotos(filteredPhoto);

      setLocalPhotos(old => [...old, ...(filteredPhoto as IUploadedPhoto[])]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onRemove = async (photo: IUploadedPhoto): Promise<void> => {
    const { fullFileName, thumbnailFileName, path, uri } = photo ?? {};

    await Promise.all([
      Storage.deleteImage(fullFileName),
      Storage.deleteImage(thumbnailFileName),
    ]);

    setLocalPhotos(old =>
      old.filter(item => {
        if (item.path) {
          return item.path !== path;
        }

        if (item.uri) {
          return item.uri !== uri;
        }

        return false;
      }),
    );

    onFinishLoadPhotos(
      localPhotos.filter(item => {
        if (item.path) {
          return item.path !== path;
        }

        if (item.uri) {
          return item.uri !== uri;
        }

        return false;
      }),
    );
  };

  const onLoadFinish =
    (el: IUploadedPhoto) =>
    (source: IUploadedPhoto): void => {
      setLocalPhotos(old =>
        old.map(item => {
          if (item.path === el.path) {
            return { ...item, ...source };
          }
          return item;
        }),
      );

      onFinishLoadPhotos(
        localPhotos.map(item => {
          if (item.path === el.path) {
            return { ...item, ...source };
          }
          return item;
        }),
      );
    };

  return (
    <View style={styles.wrapper}>
      <Text variant="titleMedium">{text}</Text>
      <View style={styles.container}>
        {!showMode && maxFiles > 0 && (
          <GalleryCell style={styles.image} onPress={handleOpenPicker} />
        )}
        {localPhotos.map(el => (
          <GalleryCell
            key={el.path || el.id}
            disabled={loading}
            image={
              <Image
                containerStyles={styles.includeImage}
                imageStyle={styles.includeImage}
                source={el as SourceType}
                onLoadFinish={onLoadFinish(el)}
              />
            }
            showMode={false}
            style={styles.image}
            text="Upload photos of your vehicles"
            onRemove={() => onRemove(el)}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(MultiPicker);
