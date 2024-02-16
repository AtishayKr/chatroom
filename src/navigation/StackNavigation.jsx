import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, SplashScreen } from '../screens';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigation
