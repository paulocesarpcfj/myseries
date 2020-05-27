import 'react-native-gesture-handler';
import React from 'react';
import { Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from './store';
import Search from './containers/Search';
import MySeries from './containers/MySeries';
import SingleShow from './containers/SingleShow';

const Stack = createStackNavigator();

const App = () => (
  <Root>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MySeries" component={MySeries} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SingleShow" component={SingleShow} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  </Root>
);

export default App;
