import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, LogInScreen, SplashScreen } from '../screens';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default StackNavigation
