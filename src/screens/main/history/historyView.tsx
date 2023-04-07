import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const HistoryView = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>History</Text>
    </SafeAreaView>
  );
};

export default memo(HistoryView);
