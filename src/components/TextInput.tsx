import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {TextInput as Input} from 'react-native-paper';

import {theme} from '../core/theme';

type Props = React.ComponentProps<typeof Input> & {errorText?: string};

const TextInput = ({errorText, ...props}: Props) => (
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
