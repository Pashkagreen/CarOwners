import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';

import { Loader } from './src/components';

import { theme } from './src/core/theme';
import RootNavigation from './src/navigation/RootNavigation1';
import { rootStore, StoreProvider, trunk } from './src/store';

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
        <FlashMessage position="top" />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
