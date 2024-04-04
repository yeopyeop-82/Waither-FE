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
import Greeting from './src/screens/Greeting';
import GreetNaming from './src/screens/GreetNaming';
import PasswordReset from './src/screens/PasswordReset';
import { RecoilRoot } from 'recoil';
import AskIntro from './src/screens/AskIntro';
import AskWeather from './src/screens/AskWeather';
import AskTimeZone from './src/screens/AskTimeZone';
import AskNotificationTime from './src/screens/AskNotificationTime';
import AskOutro from './src/screens/AskOutro';

export default function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <RecoilRoot>
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
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Greeting"
            component={Greeting}
          />
          <Stack.Screen name="GreetNaming" component={GreetNaming} />
          <Stack.Screen name="AskIntro" component={AskIntro} />
          <Stack.Screen name="AskWeather" component={AskWeather} />
          <Stack.Screen name="AskTimeZone" component={AskTimeZone} />
          <Stack.Screen
            name="AskNotificationTime"
            component={AskNotificationTime}
          />
          <Stack.Screen name="AskOutro" component={AskOutro} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </RecoilRoot>
  );
}
