import {useCallback} from 'react';

import {useFocusEffect} from '@react-navigation/native';

import {useStore} from '../../../store';
import HistoryView from './historyView';

const HistoryContainer = (): JSX.Element => {
  const {vehiclesStore} = useStore();

  const loadHistory = async () => {
    await vehiclesStore.getVehiclesHistory();
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, []),
  );

  return (
    <HistoryView items={vehiclesStore.history} loading={vehiclesStore.state} />
  );
};

export default HistoryContainer;
