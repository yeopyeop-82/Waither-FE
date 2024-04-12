import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { RecoilRoot } from 'recoil';
import AskIntro from './src/screens/AskIntro';
import AskNotificationTime from './src/screens/AskNotificationTime';
import AskOutro from './src/screens/AskOutro';
import AskTimeZone from './src/screens/AskTimeZone';
import AskWeather from './src/screens/AskWeather';
import EmailLogin from './src/screens/EmailLogin';
import GreetNaming from './src/screens/GreetNaming';
import Greeting from './src/screens/Greeting';
import Login from './src/screens/Login';
import LoginReset from './src/screens/LoginReset';
import PasswordReset from './src/screens/PasswordReset';
import Register from './src/screens/Register';
import { toastConfig } from './src/utils/toastConfig';
import SettingWind from './src/screens/SettingWind';
import { MAIN_COLOR } from './src/styles/color';
import Settings from './src/screens/Settings';
import CompanySetting from './src/screens/CompanySetting';
import MainScreenSetting from './src/screens/MainScreenSetting';
import PrivacySetting from './src/screens/PrivacySetting';

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
          <Stack.Screen
            options={{ headerShown: true }}
            name="AskOutro"
            component={AskOutro}
          />
          <Stack.Screen
            name="SettingWind"
            options={{
              title: '바람 세기 설정',
              headerStyle: {
                backgroundColor: MAIN_COLOR,
              },
              headerTintColor: '#fff',
            }}
            component={SettingWind}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="CompanySetting" component={CompanySetting} />
          <Stack.Screen
            name="MainScreenSetting"
            component={MainScreenSetting}
          />
          <Stack.Screen name="PrivacySetting" component={PrivacySetting} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </RecoilRoot>
  );
}
