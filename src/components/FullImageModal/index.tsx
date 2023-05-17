import React, { memo } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, View } from 'react-native';

import FastImage, { Source } from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../core/theme';
import getStyles from './style';

type FullImageModalProps = {
  onClose: () => void;
  image: Source;
};

const FullImageModal = ({ onClose = () => {}, image }: FullImageModalProps) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <Modal transparent onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onClose}>
        <View style={styles.imageLoading}>
          <ActivityIndicator color={theme.colors.white} size="large" />
        </View>
        <FastImage resizeMode="contain" source={image} style={styles.image} />
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(FullImageModal);
