import React, { memo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../core/theme';
import styles from './style';

interface GalleryCellProps {
  showMode?: boolean;
  image?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  text?: string;
}

const GalleryCell = ({
  showMode,
  image,
  style,
  onPress,
  onRemove,
  disabled,
}: GalleryCellProps) =>
  !image ? (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      <View style={styles.plusToAddIcon}>
        <Icon color={theme.colors.primary} name="camera" size={32} />
      </View>
    </TouchableOpacity>
  ) : (
    <View style={[styles.photo, style]}>
      {image}
      {showMode ? null : (
        <TouchableOpacity style={styles.removeIcon} onPress={onRemove}>
          <Icon color={theme.colors.secondary} name="times" size={16} />
        </TouchableOpacity>
      )}
    </View>
  );

export default memo(GalleryCell);
