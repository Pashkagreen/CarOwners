import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

import {Button as PaperButton} from 'react-native-paper';

import {theme} from '../core/theme';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({mode, style, children, disabled, ...props}: Props) => (
  <PaperButton
    disabled={disabled}
    labelStyle={styles.text}
    mode={mode}
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: theme.colors.surface},
      style,
    ]}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 26,
  },
});

export default memo(Button);
