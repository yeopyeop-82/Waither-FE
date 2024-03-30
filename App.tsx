import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import EmailLogin from './src/screens/EmailLogin';
import LoginReset from './src/screens/LoginReset';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

export default function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="EmailLogin" component={EmailLogin} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LoginReset" component={LoginReset} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
