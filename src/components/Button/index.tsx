import React, { memo } from 'react';

import { Button as PaperButton } from 'react-native-paper';

import { theme } from '../../core/theme';
import styles from './style';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({
  mode,
  style,
  children,
  disabled,
  loading,
  ...props
}: Props) => (
  <PaperButton
    disabled={disabled || loading}
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
