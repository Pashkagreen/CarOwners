import { memo, useEffect, useRef } from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import { screenWidth } from '../../core/theme';
import { SetPhotos } from '../../screens/Main/AddVehicle/AddVehicleContainer';
import getStyles from './style';

interface VehicleCarouselProps {
  data: SetPhotos[];
  index: number;
  isShowViewer: boolean;
  setIsShowViewer: (value: boolean) => void;
}
const VehicleCarouselModal = ({
  data,
  index,
  isShowViewer,
  setIsShowViewer,
}: VehicleCarouselProps) => {
  const styles = getStyles();
  const scrollRef = useRef<ScrollView>(null);

  const onClose = () => {
    setIsShowViewer(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(
        () =>
          scrollRef?.current?.scrollTo({
            x: screenWidth * index,
            animated: true,
          }),
        200,
      );
    }
  }, [index]);

  return (
    <Modal
      propagateSwipe
      isVisible={isShowViewer}
      style={styles.modal}
      swipeDirection={'down'}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}>
      <ScrollView
        ref={scrollRef}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        {!!data.length &&
          data.map(car => (
            <TouchableWithoutFeedback key={car.fullFileName}>
              <View style={styles.imageContainer}>
                <FastImage
                  key={car.fullFileName}
                  resizeMode="contain"
                  source={{ uri: car.uri }}
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </Modal>
  );
};

export default memo(VehicleCarouselModal);
