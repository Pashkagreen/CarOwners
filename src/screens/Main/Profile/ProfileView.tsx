import { FC } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Text } from 'react-native-paper';

import {
  Background,
  Button,
  PhoneInput,
  TextInput,
} from '../../../components/index';

import styles from './styles';

import { IUser } from '../../../store/user/interfaces';
import { TFetchState } from '../../../types';
import { FormData } from './ProfileContainer';

interface IProfile {
  userData: IUser;
  loading: TFetchState;
  control: any;
  errors: any;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: (userData: FormData) => Promise<void>;
  logOut: () => void;
}

const ProfileView: FC<IProfile> = ({
  logOut,
  control,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  userData,
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Background style={styles.background}>
        <View style={styles.infoBlock}>
          <View style={styles.infoItem}>
            <Text variant="titleSmall">Username: </Text>
            <Controller
              control={control}
              defaultValue={userData.username || ''}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  error={errors?.username}
                  errorText={errors?.username?.message}
                  mode="outlined"
                  style={styles.inputBlock}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              rules={{
                required: true,
              }}
            />
          </View>
          <View style={styles.infoItem}>
            <Text variant="titleSmall">Email: </Text>
            <Controller
              control={control}
              defaultValue={userData.email || ''}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  error={errors?.email}
                  errorText={errors?.email?.message}
                  keyboardType="email-address"
                  mode="outlined"
                  style={styles.inputBlock}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View style={styles.infoItem}>
            <Text variant="titleSmall">Phone number: </Text>
            <PhoneInput
              disabled={true}
              initialCountry={userData.countryCode}
              value={userData.phoneNumber}
            />
          </View>
        </View>
      </Background>
    </ScrollView>
    <View style={styles.buttonBlock}>
      <Button
        loading={loading === 'pending'}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Update info
      </Button>
      <Button mode="outlined" onPress={logOut}>
        Logout
      </Button>
    </View>
  </SafeAreaView>
);

export default ProfileView;
