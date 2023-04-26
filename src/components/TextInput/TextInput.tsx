import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { TextInput as Input } from 'react-native-paper';

import { theme } from '../../core/theme';
import styles from './style';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      mode="outlined"
      selectionColor={theme.colors.primary}
      style={styles.input}
      underlineColor="transparent"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

export default memo(TextInput);
