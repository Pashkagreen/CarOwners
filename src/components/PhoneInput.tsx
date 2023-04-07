import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PhoneInputComponent from 'react-native-phone-input';

import {theme} from '../core/theme';

export interface PhoneInputInterface {
  inputRef: React.Ref<PhoneInputComponent>;
  errorText?: string;
  notShowFlag?: boolean;
  initialCountry?: string | undefined;
  value: string;
  uniqueKey?: string | undefined;
  onChange: (text: string, uniqueKey: string | undefined) => void;
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

const getStyles = (focused: boolean) =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
      width: '100%',
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderColor: focused ? theme.colors.primary : theme.colors.outline,
      borderRadius: 4,
      borderWidth: focused ? 2 : 1,
      padding: 16,
    },
    error: {
      color: theme.colors.error,
      fontSize: 14,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
    flagIcon: {
      marginLeft: 4,
    },
    textStyle: {
      fontSize: 16,
    },
    flagWrapper: {
      '@media android': {
        paddingBottom: 4,
      },
      paddingLeft: 8,
    },
    noFlag: {
      height: 0,
      width: 0,
    },
  });

export default memo(PhoneInput);
