import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';

import { navigationRef } from './src/navigation/config';

import { theme } from './src/core/theme';
import RootNavigation from './src/navigation';
import { rootStore, StoreProvider, rehydrate } from './src/store';

const App = () => {
  /**
   * Rehydrate persisted stores & hide Splash screen
   */
  useEffect(() => {
    void rehydrate();
  }, []);

  return (
    <StoreProvider value={rootStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            backgroundColor={theme.colors.white}
            barStyle={'dark-content'}
          />
          <RootNavigation />
        </NavigationContainer>
        <FlashMessage position="top" />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
