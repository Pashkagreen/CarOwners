import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const ProfileView = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default memo(ProfileView);
