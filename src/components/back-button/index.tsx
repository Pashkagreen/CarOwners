import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { hitSlop, theme } from '@theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

interface IBackButton {
  goBack: () => void;
}

const BackButton: FC<IBackButton> = ({ goBack }) => (
  <TouchableOpacity hitSlop={hitSlop} style={styles.container} onPress={goBack}>
    <Icon color={theme.colors.secondary} name="arrow-left" size={24} />
  </TouchableOpacity>
);

export default BackButton;
