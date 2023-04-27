import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';

import PhoneInputComponent from 'react-native-phone-input';

import { theme } from '../../core/theme';
import getStyles from './style';

export interface PhoneInputInterface {
  disabled?: boolean;
  inputRef?: React.Ref<PhoneInputComponent>;
  errorText?: string;
  notShowFlag?: boolean;
  initialCountry?: string | undefined;
  value: string;
  uniqueKey?: string | undefined;
  onChange?: (text: string, uniqueKey: string | undefined) => void;
  onSubmitEditing?: () => void;
}

type PhoneInputProps = React.ComponentProps<typeof PhoneInputComponent> &
  PhoneInputInterface;

const PhoneInput = ({
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
}: PhoneInputProps) => {
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
