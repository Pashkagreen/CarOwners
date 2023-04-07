import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const MyGarageView = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>My garage</Text>
    </SafeAreaView>
  );
};

export default memo(MyGarageView);
