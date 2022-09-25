import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigator from './src/navigation/navigator';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
