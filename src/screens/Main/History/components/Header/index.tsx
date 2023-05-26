import { memo } from 'react';

import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import getStyles from './style';

const Header = ({ headerY, headerHeight }: any) => {
  const styles = getStyles(headerY, headerHeight);
  return (
    <Animated.View style={styles.container}>
      <Text style={styles.text} variant="titleLarge">
        History
      </Text>
    </Animated.View>
  );
};

export default memo(Header);
