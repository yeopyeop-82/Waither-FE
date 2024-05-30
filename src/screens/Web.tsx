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
        source={{ uri: 'https://www.naver.com/' }}
      />
    </SafeAreaView>
  );
};

export default Web;
