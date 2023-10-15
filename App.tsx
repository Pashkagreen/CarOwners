import React, { useEffect} from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';

import { navigationRef } from './src/navigation/config';

import { theme } from './src/core/theme';
import RootNavigation from './src/navigation';
import { rootStore, StoreProvider, trunk } from './src/store';

const App = () => {
  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      LottieSplashScreen.hide();
    };

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
