import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../../store';
import HistoryView from './HistoryView';

const HistoryContainer = (): JSX.Element => {
  const {
    vehiclesStore,
    userStore: {
      user: { headerHeight },
    },
  } = useStore();

  const loadHistory = async () => {
    await vehiclesStore.getVehiclesHistory();
  };

  useEffect(() => {
    loadHistory();
  }, [vehiclesStore.vehicles]);

  return (
    <HistoryView
      headerHeight={headerHeight}
      items={vehiclesStore.history}
      loading={vehiclesStore.state}
    />
  );
};

export default observer(HistoryContainer);
