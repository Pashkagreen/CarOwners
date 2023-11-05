import { FC } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { hitSlop } from '@theme';
import { Text } from 'react-native-paper';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getStyles from './styles';

interface ICustomHeader {
  text: string;
  headerHeight: number;
  style?: ViewStyle;
  rightButton?: boolean;
  onIconPress?: () => void;
  iconName?: string;
  animatedStyles?: AnimatedStyle;
}

const CustomHeader: FC<ICustomHeader> = ({
  text,
  style,
  headerHeight,
  rightButton = false,
  onIconPress,
  iconName,
  animatedStyles,
}) => {
  const styles = getStyles(headerHeight);

  return (
    <>
      {animatedStyles ? (
        <Animated.View style={[styles.container, style, animatedStyles]}>
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

export default CustomHeader;
