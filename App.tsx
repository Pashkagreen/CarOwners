import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { navigationRef } from '@navigation/config';
import RootNavigator from '@navigation/index';
import { NavigationContainer } from '@react-navigation/native';
import { rehydrate, rootStore, StoreProvider } from '@stores';
import { theme } from '@theme';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  /**
   * Rehydrate persisted stores & hide Splash screen
   */
  useEffect(() => void rehydrate(), []);

  return (
    <StoreProvider value={rootStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            backgroundColor={theme.colors.white}
            barStyle={'dark-content'}
          />
          <RootNavigator />
        </NavigationContainer>
        <FlashMessage position="top" />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
