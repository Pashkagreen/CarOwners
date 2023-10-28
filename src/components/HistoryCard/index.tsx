import { FC } from 'react';
import { View } from 'react-native';

import { IHistory } from '@stores/vehicles/interfaces';
import { theme } from '@theme';
import { formatDateFromSeconds } from '@utils';
import { Text } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

import styles from './style';

interface HistoryCardProps {
  item: IHistory;
  index: number;
}

const HistoryCard: FC<HistoryCardProps> = ({ item, index }) => {
  const { id, data } = item ?? {};
  const { create, update, delete: deleteInfo } = data ?? {};

  if (!item) {
    return;
  }

  return (
    <Animated.View entering={FadeIn.delay(index * 10)} style={styles.container}>
      <View style={styles.info}>
        <Text>VehicleId: </Text>
        <Text style={{ color: theme.colors.primary }} variant="titleSmall">
          {id}
        </Text>
      </View>
      {create && (
        <View style={styles.text}>
          <Text>Created: </Text>
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            {formatDateFromSeconds(create._seconds)}
          </Text>
        </View>
      )}
      {update && (
        <View style={styles.text}>
          <Text>Last updated: </Text>
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            {formatDateFromSeconds(update._seconds)}
          </Text>
        </View>
      )}
      {deleteInfo && (
        <View>
          <Text>Deleted at: </Text>
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            {formatDateFromSeconds(deleteInfo._seconds)}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default HistoryCard;
