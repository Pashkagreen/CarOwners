import {StyleSheet, View} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';

const Loader = (): JSX.Element => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
