import { FC, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { SNAP_INTERVAL } from '@constants';
import { IUploadedPhoto } from '@screens/main/add-vehicle';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';

import CarouselItem from './components/carousel-item';

import styles from './styles.ts';

interface IVehicleCarousel {
  data: IUploadedPhoto[];
  viewerIndex: number;
  isShowViewer: boolean;
  setIsShowViewer: (value: boolean) => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VehicleCarousel: FC<IVehicleCarousel> = ({
  data,
  viewerIndex,
  isShowViewer,
  setIsShowViewer,
}) => {
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

export default VehicleCarousel;
