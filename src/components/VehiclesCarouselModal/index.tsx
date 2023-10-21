import { memo, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';

import CarouselItem from './components/CarouselItem';

import { SNAP_INTERVAL } from '../../core/constants';
import { IUploadedPhoto } from '../../screens/Main/AddVehicle/AddVehicleContainer';
import styles from './style';

interface VehicleCarouselProps {
  data: IUploadedPhoto[];
  viewerIndex: number;
  isShowViewer: boolean;
  setIsShowViewer: (value: boolean) => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VehicleCarouselModal = ({
  data,
  viewerIndex,
  isShowViewer,
  setIsShowViewer,
}: VehicleCarouselProps) => {
  const scrollRef = useRef<FlatList<any>>(null);
  const [scrollX, setScrollX] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollX(event.nativeEvent.contentOffset.x);
  };

  const onClose = () => {
    setIsShowViewer(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(
        () =>
          scrollRef.current?.scrollToIndex({
            index: viewerIndex,
            animated: true,
            viewPosition: 0.5,
          }),
        200,
      );
    }
  }, [viewerIndex]);

  return (
    <Modal
      propagateSwipe
      backdropOpacity={0.9}
      isVisible={isShowViewer}
      style={styles.modal}
      swipeDirection={'down'}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}>
      <Animated.View style={styles.container}>
        {!!data.length && (
          <AnimatedFlatList
            ref={scrollRef}
            disableIntervalMomentum
            disableScrollViewPanResponder
            horizontal
            data={data}
            decelerationRate={'normal'}
            keyExtractor={(i, idx) => idx.toString()}
            renderItem={({ item, index }) => (
              <CarouselItem
                index={index}
                item={item as IUploadedPhoto}
                length={data.length}
                scrollX={scrollX}
              />
            )}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            onScroll={onScroll}
          />
        )}
      </Animated.View>
    </Modal>
  );
};

export default memo(VehicleCarouselModal);
