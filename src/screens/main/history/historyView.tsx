import {memo} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator, Text} from 'react-native-paper';

import {Background} from '../../../components';

import {theme} from '../../../core/theme';

interface IHistoryInterface {
  loading: boolean;
  flashRef: any;
  items: any[];
}
const HistoryView = ({
  loading,
  flashRef,
  items,
}: IHistoryInterface): JSX.Element => (
  <>
    <SafeAreaView style={styles.container}>
      <Background style={styles.background}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText} variant="headlineMedium">
            History of your vehicles
          </Text>
        </View>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList data={items} renderItem={() => <View />} />
        )}
      </Background>
      <FlashMessage ref={flashRef} position="top" />
    </SafeAreaView>
  </>
);

export default memo(HistoryView);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
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
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});
