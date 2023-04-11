import {StyleSheet, View} from 'react-native';

import {Text} from 'react-native-paper';

import {formatDateFromSeconds} from '../core/utils';

import {theme} from '../core/theme';

const HistoryCard = ({item}: any) => (
  <View style={styles.container}>
    <View style={styles.info}>
      <Text>VehicleId: </Text>
      <Text style={{color: theme.colors.primary}} variant="titleSmall">
        {item.id}
      </Text>
    </View>
    {item.data.create && (
      <View style={styles.text}>
        <Text>Created: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleSmall">
          {formatDateFromSeconds(item.data.create._seconds)}
        </Text>
      </View>
    )}
    {item.data.update && (
      <View style={styles.text}>
        <Text>Last updated: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleSmall">
          {formatDateFromSeconds(item.data.update._seconds)}
        </Text>
      </View>
    )}
    {item.data.delete && (
      <View>
        <Text>Deleted at: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
          {formatDateFromSeconds(item.data.delete._seconds)}
        </Text>
      </View>
    )}
  </View>
);

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.secondary,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  text: {marginBottom: 8},
});
