import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Lottie from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

import { IUploadedPhoto } from '../../../../screens/Main/AddVehicle/AddVehicleContainer';
import styles from './style';

interface ScrollablePhotoItemProps {
  photo: IUploadedPhoto;
  onPhotoPress: () => void;
}

const ScrollablePhotoItem = ({
  photo,
  onPhotoPress,
}: ScrollablePhotoItemProps) => {
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
