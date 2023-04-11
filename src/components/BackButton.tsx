import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {hitSlop, theme} from '../core/theme';

type Props = {
  goBack: () => void;
};

const BackButton = ({goBack}: Props) => (
  <TouchableOpacity hitSlop={hitSlop} style={styles.container} onPress={goBack}>
    <Icon color={theme.colors.black} name="arrow-left" size={24} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    left: 14,
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
  },
});

export default memo(BackButton);
