import { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { IUploadedPhoto } from '@screens/main/add-vehicle';
import Lottie from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

interface IScrollablePhotoItem {
  photo: IUploadedPhoto;
  onPhotoPress: () => void;
}

const ScrollablePhotoItem: FC<IScrollablePhotoItem> = ({
  photo,
  onPhotoPress,
}) => {
  const [loading, setLoading] = useState(true);

  const onLoadEnd = () => {
    setLoading(false);
  };
  return (
    <TouchableOpacity key={photo.uri} onPress={onPhotoPress}>
      {loading && (
        <View style={styles.loaderStyle}>
          <Lottie
            autoPlay
            loop
            source={require('../../../../assets/carousel_loading.json')}
            style={styles.lottieLoader}
          />
        </View>
      )}
      <FastImage
        resizeMode="cover"
        source={{ uri: photo.thumbnailUri }}
        style={styles.imageStyle}
        onLoadEnd={onLoadEnd}
      />
    </TouchableOpacity>
  );
};

export default ScrollablePhotoItem;
