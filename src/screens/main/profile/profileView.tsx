import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const ProfileView = (): JSX.Element => (
  <SafeAreaView>
    <Text>Profile</Text>
  </SafeAreaView>
);

export default memo(ProfileView);
