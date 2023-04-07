import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';

import RootNavigation from './src/navigation/rootNavigation';
import { theme } from './src/core/theme';
import { StoreProvider, rootStore, trunk } from './src/store';
import Loader from './src/components/Loader';


function App(): JSX.Element {
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init()
      setIsStoreLoaded(true)
    }

    rehydrate()
  }, [])

  return (
      !isStoreLoaded 
      ? 
      <Loader/> 
      :
      <StoreProvider value={rootStore}>
        <Provider theme={theme}>
          <NavigationContainer>
              <RootNavigation/>
          </NavigationContainer>
        </Provider>
      </StoreProvider>  
    );
};

export default App;
