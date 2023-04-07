import React, {memo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
  onChange = () => {},
  onSelectCountry = () => {},
  onSubmitEditing = () => {},
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
        allowZeroAfterCountryCode={true}
        ref={inputRef}
        initialCountry={initialCountry}
        initialValue={value}
        style={styles.input}
        textStyle={styles.textStyle}
        onSelectCountry={onSelectCountry}
        onChangePhoneNumber={_onChange}
        flagStyle={notShowFlag ? styles.noFlag : styles.flagIcon}
        offset={16}
        textProps={{
          keyboardType: 'phone-pad',
          textContentType: 'none',
          selectionColor: focused ? theme.colors.primary : theme.colors.outline,
          onSubmitEditing: onSubmitEditing,
          onBlur: handleBlur,
          onFocus: handleFocus,
        }}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const getStyles = (focused: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderWidth: focused ? 2 : 1,
      borderRadius: 4,
      borderColor: focused ? theme.colors.primary : theme.colors.outline,
    },
    error: {
      fontSize: 14,
      color: theme.colors.error,
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
      paddingLeft: 8,
      '@media android': {
        paddingBottom: 4,
      },
    },
    noFlag: {
      height: 0,
      width: 0,
    },
  });

export default memo(PhoneInput);
