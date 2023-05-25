import { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../../store';
import HistoryView from './HistoryView';

const HistoryContainer = (): JSX.Element => {
  const { vehiclesStore } = useStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    loadHistory(true);
    setRefreshing(false);
  };

  const loadHistory = async (force = false) => {
    await vehiclesStore.getVehiclesHistory(force);
  };

  useEffect(() => {
    loadHistory();
  }, [vehiclesStore.vehicles]);

  return (
    <HistoryView
      items={vehiclesStore.history}
      loading={vehiclesStore.state}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default observer(HistoryContainer);
