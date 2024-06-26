import React, { FC, memo, useState } from 'react';
import { Text, View } from 'react-native';

import { theme } from '@theme';
import PhoneInputComponent from 'react-native-phone-input';

import getStyles from './styles';

export interface IPhoneInput {
  value: string;
  disabled?: boolean;
  inputRef?: React.Ref<PhoneInputComponent>;
  errorText?: string;
  notShowFlag?: boolean;
  initialCountry?: string;
  uniqueKey?: string;
  onChange?: (text: string, uniqueKey: string | undefined) => void;
  onSubmitEditing?: () => void;
}

type TPhoneInput = React.ComponentProps<typeof PhoneInputComponent> &
  IPhoneInput;

const PhoneInput: FC<TPhoneInput> = ({
  errorText,
  notShowFlag = false,
  inputRef,
  initialCountry,
  value = '',
  uniqueKey,
  onChange,
  onSelectCountry,
  onSubmitEditing,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);
  const styles = getStyles(focused);

  const _onChange = (text: string) => {
    onChange && onChange(text, uniqueKey);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.container}>
      <PhoneInputComponent
        ref={inputRef}
        allowZeroAfterCountryCode={true}
        disabled={disabled}
        flagStyle={notShowFlag ? styles.noFlag : styles.flagIcon}
        initialCountry={initialCountry}
        initialValue={value}
        offset={16}
        style={styles.input}
        textProps={{
          keyboardType: 'phone-pad',
          textContentType: 'none',
          selectionColor: focused ? theme.colors.primary : theme.colors.outline,
          onSubmitEditing: onSubmitEditing,
          onBlur: handleBlur,
          onFocus: handleFocus,
        }}
        textStyle={styles.textStyle}
        onChangePhoneNumber={_onChange}
        onSelectCountry={onSelectCountry}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default memo(PhoneInput);
