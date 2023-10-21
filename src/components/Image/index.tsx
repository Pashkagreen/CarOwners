import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { ReactNativeFirebase } from '@react-native-firebase/app';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import ImageResizer from 'react-native-image-resizer';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Storage } from '../../services/storage';

import { flashMessage } from '../../core/utils';

import { resizePhotoParams } from '../../core/constants';
import { theme } from '../../core/theme';
import { IUploadedPhoto } from '../../screens/Main/AddVehicle/AddVehicleContainer';
import FullImageModal from '../FullImageModal';
import ProgressiveImage, { SourceType } from '../ProgressiveImage';
import styles from './style';

interface ImageProps {
  disabled?: boolean;
  withLoad?: boolean;
  source: SourceType;
  onLoadFinish: (args: IUploadedPhoto) => void;
  containerStyles?: ViewStyle;
  imageStyle?: ImageStyle;
  emptyStyle?: ViewStyle;
}

const Image = ({
  containerStyles = {},
  imageStyle = {},
  emptyStyle = {},
  disabled,
  onLoadFinish = () => {},
  source,
  withLoad = true,
}: ImageProps) => {
  const [repeatCount, setRepeatCount] = useState(0);
  const [error, setError] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [thumbnailUri, setThumbnailUri] = useState('');
  const [fullUri, setFullUri] = useState('');
  const [fullFileName, setFullFileName] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');

  const onError = (err: ReactNativeFirebase.NativeFirebaseError) => {
    setLoadingImage(false);
    flashMessage({
      type: 'danger',
      message: 'Uploading error occurred!',
      description: err.message,
    });
    setError(false);
  };

  const loadImageToStorage = async () => {
    const uploadFileName =
      Platform.OS === 'android'
        ? source.path.substring(source.path.lastIndexOf('/') + 1)
        : source.filename;

    try {
      const res = await ImageResizer.createResizedImage(
        source.path,
        resizePhotoParams.width,
        resizePhotoParams.height,
        resizePhotoParams.format,
        resizePhotoParams.quality,
        resizePhotoParams.rotation,
      );

      await Storage.uploadImage(
        res,
        res.name,
        setThumbnailUri,
        setThumbnailFileName,
        () => {},
        onError,
        () => {},
      );
      await Storage.uploadImage(
        source,
        uploadFileName,
        setFullUri,
        setFullFileName,
        () => {},
        onError,
        setLoadingImage,
      );
    } catch (err) {
      if (repeatCount > 5) {
        setError(true);
        return;
      }
      loadImageToStorage();
      setRepeatCount(old => old + 1);
    }
  };

  useEffect(() => {
    if (fullUri && thumbnailUri) {
      onLoadFinish({
        uri: fullUri,
        thumbnailUri,
        fullFileName,
        thumbnailFileName,
      });
    }
  }, [thumbnailUri, fullUri]);

  useEffect(() => {
    if (withLoad && source && !source.uri && !source.thumbnailUri) {
      setError(false);
      setRepeatCount(0);
      loadImageToStorage();
    }
  }, [source]);

  const renderImage = () => {
    if (source) {
      if (source.path) {
        return (
          <FastImage
            source={{ uri: source.path }}
            style={[styles.imageStyle, imageStyle]}
          />
        );
      } else if (source.uri) {
        return (
          <ProgressiveImage
            imageStyle={[styles.imageStyle, imageStyle]}
            source={source}
          />
        );
      }
    } else {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.white} />
        </View>
      );
    }
    return <View style={[styles.imageStyle, emptyStyle]} />;
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, containerStyles]}
      onPress={() => setOpenImage(true)}>
      {openImage && (
        <FullImageModal
          image={{ uri: source.uri }}
          onClose={() => setOpenImage(false)}
        />
      )}
      {renderImage()}

      {withLoad && loadingImage && (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.white} />
        </View>
      )}
      {error ? (
        <View style={styles.loading}>
          <Icon color={theme.colors.error} name="times" size={16} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(Image);
