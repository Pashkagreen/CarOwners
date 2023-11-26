import { useEffect, useState } from 'react';

import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

import HistoryView from './view';

const HistoryContainer = () => {
  const {
    vehiclesStore: { getVehiclesHistory, history, vehicles, state },
    userStore: {
      user: { headerHeight },
    },
  } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => void getVehiclesHistory(), [vehicles]);

  const onRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    await getVehiclesHistory();
    setIsRefreshing(false);
  };

  return (
    <HistoryView
      headerHeight={headerHeight}
      isRefreshing={isRefreshing}
      items={history}
      loading={state}
      onRefresh={onRefresh}
    />
  );
};

export default observer(HistoryContainer);
