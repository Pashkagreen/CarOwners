import { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../../store';
import HistoryView from './HistoryView';

const HistoryContainer = (): JSX.Element => {
  const {
    vehiclesStore: { getVehiclesHistory, history, vehicles, state },
    userStore: {
      user: { headerHeight },
    },
  } = useStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    void getVehiclesHistory();
  }, [vehicles]);

  const onRefresh = (): void => {
    setIsRefreshing(true);
    void getVehiclesHistory();
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
