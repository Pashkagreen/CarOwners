import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {Text, TextInput} from 'react-native-paper';

import {Background, Button, PhoneInput} from '../../../components';

import {theme} from '../../../core/theme';
import {User} from '../../../store/UserStore';

interface ProfilePropsInterface {
  username: string;
  email: string;
  userData: User;
  loading: boolean;
  logOut: () => void;
  updateInfo: () => void;
  setUsername: (text: string) => void;
  setEmail: (text: string) => void;
}

const ProfileView = ({
  logOut,
  updateInfo,
  setUsername,
  setEmail,
  loading,
  userData,
  username,
  email,
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
            <TextInput
              mode="outlined"
              style={styles.inputBlock}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.infoItem}>
            <Text variant="titleSmall">Email: </Text>
            <TextInput
              mode="outlined"
              style={styles.inputBlock}
              value={email}
              onChangeText={setEmail}
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
          <Button loading={loading} mode="contained" onPress={updateInfo}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    width: '100%',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoBlock: {
    alignItems: 'center',
    width: '100%',
  },
  infoItem: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    marginTop: 24,
    width: '100%',
  },
  buttonBlock: {
    marginTop: 12,
    width: '100%',
  },
  inputBlock: {
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});
