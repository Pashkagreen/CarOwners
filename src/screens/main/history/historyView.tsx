import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const HistoryView = (): JSX.Element => (
  <SafeAreaView>
    <Text>History</Text>
  </SafeAreaView>
);

export default memo(HistoryView);
