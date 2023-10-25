import React, { FC, memo, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { Image as IImage } from 'react-native-image-crop-picker';
import { Text } from 'react-native-paper';

import { Storage } from '../../services/storage';

import checkStoragePermissions from '../../core/permissions';
import {
  isUploadedPhoto,
  IUploadedPhoto,
} from '../../screens/Main/AddVehicle/AddVehicleContainer';
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

  useEffect(() => {
    if (isUploadedPhoto(localPhotos)) {
      onFinishLoadPhotos(localPhotos);
    }
  }, [localPhotos]);

  return (
    <View style={styles.wrapper}>
      <Text variant="titleMedium">{text}</Text>
      <View style={styles.container}>
        {!showMode && maxFiles > 0 && (
          <GalleryCell style={styles.image} onPress={handleOpenPicker} />
        )}
        {localPhotos?.length &&
          localPhotos.map(el => (
            <GalleryCell
              key={el.path}
              disabled={loading}
              image={
                <Image
                  containerStyles={styles.includeImage}
                  imageStyle={styles.includeImage}
                  source={el as SourceType}
                  onLoadFinish={source => {
                    setLocalPhotos(old =>
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

                setLocalPhotos(old =>
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
