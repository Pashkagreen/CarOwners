import { memo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { hitSlop } from '../../core/theme';
import getStyles from './style';

interface CustomHeaderProps {
  text: string;
  style?: ViewStyle;
  headerY?: any;
  headerHeight: number;
  rightButton?: boolean;
  onIconPress?: () => void;
  iconName?: string;
  animated?: boolean;
}
const CustomHeader = ({
  text,
  style,
  headerY,
  headerHeight,
  rightButton = false,
  onIconPress,
  iconName,
  animated = false,
}: CustomHeaderProps) => {
  const headerYValue = headerY ? headerY : null;

  const styles = getStyles(animated, headerYValue, headerHeight);
  return (
    <>
      {animated ? (
        <Animated.View style={[styles.container, style]}>
          <Text style={styles.text} variant="titleLarge">
            {text}
          </Text>
          {rightButton && iconName && (
            <TouchableOpacity hitSlop={hitSlop} onPress={onIconPress}>
              <Icon name={iconName} size={24} />
            </TouchableOpacity>
          )}
        </Animated.View>
      ) : (
        <View style={[styles.container, style]}>
          <Text style={styles.text} variant="titleLarge">
            {text}
          </Text>
          {rightButton && iconName && (
            <TouchableOpacity hitSlop={hitSlop} onPress={onIconPress}>
              <Icon name={iconName} size={24} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default memo(CustomHeader);
