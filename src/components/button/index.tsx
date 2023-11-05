import React, { FC } from 'react';

import { theme } from '@theme';
import { Button as PaperButton } from 'react-native-paper';

import styles from './styles';

type TButtonProps = React.ComponentProps<typeof PaperButton>;

const Button: FC<TButtonProps> = ({
  mode,
  style,
  children,
  disabled,
  ...props
}) => (
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

export default Button;
