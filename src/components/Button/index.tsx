import React, { memo } from 'react';

import { theme } from '@theme';
import { Button as PaperButton } from 'react-native-paper';

import styles from './style';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, disabled, ...props }: Props) => (
  <PaperButton
    disabled={disabled}
    labelStyle={styles.text}
    mode={mode}
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    {...props}>
    {children}
  </PaperButton>
);

export default memo(Button);
