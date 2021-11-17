import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/tabs';
import { Home, Restaurant, OrderDelivery, Orders } from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Tabs"}
      >
        <Stack.Screen name="Tabs" component={Tabs}/>
        <Stack.Screen name="Restaurant" component={Restaurant}/>
        <Stack.Screen name="OrderDelivery" component={OrderDelivery}/>
        <Stack.Screen name="Orders" component={Orders}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
