import { SafeAreaView, ScrollView, View } from 'react-native';

import { Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';

import {
  Background,
  Button,
  PhoneInput,
  TextInput,
} from '../../../components/index';

import { User } from '../../../store/UserStore';
import { fetchState } from '../../../store/VehiclesStore';
import { FormData } from './ProfileContainer';
import styles from './style';
interface ProfilePropsInterface {
  userData: User;
  loading: fetchState;
  control: any;
  errors: any;
  handleSubmit: any;
  onSubmit: (userData: FormData) => Promise<void>;
  logOut: () => void;
}

const ProfileView = ({
  logOut,
  control,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  userData,
}: ProfilePropsInterface): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Background style={styles.background}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText} variant="headlineMedium">
            Your profile
          </Text>
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
              initialCountry={userData.countryCode || undefined}
              value={userData.phoneNumber}
            />
          </View>
        </View>
        <View style={styles.buttonBlock}>
          <Button
            loading={loading === 'pending' ? true : false}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            Update info
          </Button>
          <Button mode="outlined" onPress={logOut}>
            Logout
          </Button>
        </View>
      </Background>
    </ScrollView>
  </SafeAreaView>
);

export default ProfileView;
