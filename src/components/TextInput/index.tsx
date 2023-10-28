import React, { memo } from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { theme } from '@theme';
import { TextInput as Input } from 'react-native-paper';

import styles from './style';

type Props = React.ComponentProps<typeof Input> & {
  additionalStyles?: ViewStyle;
  errorText?: string;
};

const TextInput = ({ errorText, additionalStyles, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      mode="outlined"
      selectionColor={theme.colors.primary}
      style={[styles.input, additionalStyles]}
      underlineColor="transparent"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

export default memo(TextInput);
