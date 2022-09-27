import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import RootNavigator from './src/navigation/RootNavigator';
import {useEffect} from 'react';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </TailwindProvider>
  );
};

export default App;
