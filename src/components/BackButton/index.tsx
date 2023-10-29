import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import { hitSlop, theme } from '@theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';

interface Props {
  goBack: () => void;
}

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity hitSlop={hitSlop} style={styles.container} onPress={goBack}>
    <Icon color={theme.colors.secondary} name="arrow-left" size={24} />
  </TouchableOpacity>
);

export default memo(BackButton);
