import {useEffect, useState} from 'react';

import {useStore} from '../../../store';
import HistoryView from './historyView';

const HistoryContainer = (): JSX.Element => {
  const {vehiclesStore} = useStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    loadHistory();
    setRefreshing(false);
  };

  const loadHistory = async () => {
    await vehiclesStore.getVehiclesHistory();
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <HistoryView
      items={vehiclesStore.history}
      loading={vehiclesStore.state}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default HistoryContainer;
