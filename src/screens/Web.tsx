import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const Web = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <WebView
        style={{ flex: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
        source={{
          uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d123b0e487f515ba55f26453d6537fbc&redirect_uri=https://waither.shop/user/oauth/kakao/callback',
        }}
      />
    </SafeAreaView>
  );
};

export default Web;
