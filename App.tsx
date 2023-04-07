import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import Loader from './src/components/Loader';

import {theme} from './src/core/theme';
import RootNavigation from './src/navigation/rootNavigation';
import {rootStore, StoreProvider, trunk} from './src/store';

const App = (): JSX.Element => {
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      setIsStoreLoaded(true);
    };

    rehydrate();
  }, []);

  return !isStoreLoaded ? (
    <Loader />
  ) : (
    <StoreProvider value={rootStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
