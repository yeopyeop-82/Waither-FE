import Toast from 'react-native-toast-message';

export const showToast = (text1: string, text2: string) => {
  Toast.show({
    type: 'waitherToast',
    text1: text1,
    text2: text2,
    position: 'top',
    visibilityTime: 3000,
  });
};
