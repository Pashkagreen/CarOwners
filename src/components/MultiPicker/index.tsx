import React, { FC, memo, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { Text } from 'react-native-paper';

import { Storage } from '../../services/storage';

import checkStoragePermissions from '../../core/permissions';
import {
  isUploadedPhoto,
  IUploadedPhoto,
  LocalPhotosState,
} from '../../screens/Main/AddVehicle/AddVehicleContainer';
import GalleryCell from '../GalleryCell';
import Image from '../Image';
import styles from './style';

interface IMultiPicker {
  onFinishLoadPhotos: (photos: IUploadedPhoto[]) => void;
  onUploadPhotos: (photos: LocalPhotosState[]) => void;
  text: string;
  value?: IUploadedPhoto[];
  showMode?: boolean;
  parameters?: any[];
}

const MultiPicker: FC<IMultiPicker> = ({
  onFinishLoadPhotos,
  onUploadPhotos,
  value,
  showMode,
  parameters,
  text,
}) => {
  const [localMainPhotos, setLocalMainPhotos] = useState<LocalPhotosState[]>(
    value ?? [],
  );
  const [loading, setLoading] = useState(false);

  const maxFiles = 15 - localMainPhotos.length;

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
        localMainPhotos.every(photo => photo.path !== el.path),
      );

      onUploadPhotos(filteredPhoto);

      setLocalMainPhotos(old => [...old, ...filteredPhoto]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUploadedPhoto(localMainPhotos)) {
      onFinishLoadPhotos(localMainPhotos);
    }
  }, [localMainPhotos]);

  useEffect(() => {
    if (parameters) {
      void handleOpenPicker();
    }
  }, [parameters]);

  return (
    <View style={styles.wrapper}>
      <Text variant="titleMedium">{text}</Text>
      <View style={styles.container}>
        {!showMode && maxFiles > 0 && (
          <GalleryCell style={styles.image} onPress={handleOpenPicker} />
        )}
        {localMainPhotos?.length &&
          localMainPhotos.map(el => (
            <GalleryCell
              key={el.uri || el.path}
              disabled={loading}
              image={
                <Image
                  containerStyles={styles.includeImage}
                  imageStyle={styles.includeImage}
                  source={el}
                  onLoadFinish={source => {
                    setLocalMainPhotos(old =>
                      old.map(item => {
                        if (item.path === el.path) {
                          return { ...item, ...source };
                        }
                        return item;
                      }),
                    );
                  }}
                />
              }
              showMode={false}
              style={[styles.image]}
              text={'Upload photos of your vehicles'}
              onRemove={async () => {
                await Promise.all([
                  Storage.deleteImage(el.fullFileName),
                  Storage.deleteImage(el.thumbnailFileName),
                ]);

                setLocalMainPhotos(old =>
                  old.filter(item => {
                    if (item.path) {
                      return item.path !== el.path;
                    } else if (item.uri) {
                      return item.uri !== el.uri;
                    }
                    return false;
                  }),
                );
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default memo(MultiPicker);
