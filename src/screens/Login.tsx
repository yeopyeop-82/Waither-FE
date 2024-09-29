import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { styled } from 'styled-components/native';
import AppleLogo from '../assets/images/Apple-logo.png';
import KakaoLogo from '../assets/images/Kakao-logo.png';
import waitherLogo from '../assets/images/waither-logo.png';
import {
  APPLE_LOGIN_COLOR,
  KAKAO_LOGIN_COLOR,
  MAIN_COLOR,
} from '../styles/color.js';

import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  serviceTerms as getKakaoServiceTerms,
  unlink,
  KakaoOAuthToken,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Logo = styled.Image`
  bottom: 5px;
  position: relative;
  width: 165px;
  height: 138px;
`;

const KakaoLoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${KAKAO_LOGIN_COLOR};
  width: 292px;
  height: 44px;
  border-radius: 10px;
  margin-bottom: 9px;
`;

const AppleLoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${APPLE_LOGIN_COLOR};
  width: 292px;
  height: 44px;
  border-radius: 10px;
`;

const LoginTitle = styled.Text`
  margin-bottom: 60px;
  font-size: 22px;
`;

const KaKaoLoginTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const AppleLoginTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

const KakaoImage = styled.Image`
  width: 20px;
  height: 19px;
  margin-top: 3px;
  margin-right: 8px;
`;

const AppleImage = styled.Image`
  width: 23px;
  height: 23px;
  margin-bottom: 2px;
  margin-right: 8px;
`;

const Wrapper2 = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

const EmailLoginBtn = styled.TouchableOpacity``;

const NotLoginBtn = styled.TouchableOpacity``;

const EmailLoginText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
`;

const NotLoginText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
`;

const DivideText = styled.Text`
  font-size: 17px;
  padding-bottom: 3px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px 5px;
`;

const NotUser = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  margin-top: 45px;
  margin-bottom: 13px;
`;

const EmailRegister = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  width: 292px;
  height: 44px;
  border: 1.3px;
  border-color: ${MAIN_COLOR};
  border-radius: 10px;
`;

const EmailRegisterText = styled.Text`
  color: ${MAIN_COLOR};
  font-size: 15px;
  font-weight: 600;
`;

const LoginPopup = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 38px;
  border-radius: 15px;
  width: 280px;
  height: 180px;
  background-color: white;
`;

const LoginPopupText = styled.Text`
  text-align: center;
  font-size: 16px;
`;

const PopupBtnWrapper = styled.View`
  width: 210px;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const LoginPopupBackBtn = styled.TouchableOpacity`
  width: 95px;
  height: 42px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const LoginPopupBackText = styled.Text``;

const LoginPopupGoodBtn = styled.TouchableOpacity`
  width: 95px;
  height: 42px;
  background-color: ${MAIN_COLOR};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const LoginPopupGoodText = styled.Text`
  color: white;
`;

// eslint-disable-next-line react/prop-types
export default function Login({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const withOutLoginOnPress = () => {
    setModalVisible(!isModalVisible);
  };

  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);
  const [nickname, setNickname] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setEmail;
    setId;
    setNickname;
  }, [email, id, nickname]);

  const signInWithKakao = async (): Promise<void> => {
    const result: KakaoOAuthToken = await login();
    getProfile();
    setAccessToken(result.accessToken);
    // console.log('로그인 결과', result);
    KakaoLoginPost();
  };
  //--------------------------------------------------
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      setProfile(JSON.stringify(profile));
      setEmail(profile.email);
      setNickname(profile.nickname);
      setId(profile.id);

      // console.log('프로필 조회', profile);
    } catch (err) {
      console.error('signOut error', err);
    }
  };
  //--------------------------------------------------
  const KakaoLoginPost = async () => {
    const url = 'https://waither.shop/user/oauth/kakao/login';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      accessToken: accessToken,
      authId: id,
      email: email,
      nickname: nickname,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        console.log(response.status);
        // throw new Error('Network response was not ok');
      }

      const res = await response.json();

      //-------------------------------------------------------------------------------
      if (res.result && res.result.accessToken && res.result.refreshToken) {
        const { accessToken, refreshToken } = res.result;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        console.log(accessToken);
        navigation.navigate('MainScreen');
      } else {
        console.error('Invalid response structure:', res);
      }
      //-------------------------------------------------------------------------------

      console.log('카카오 로그인', res);
    } catch (error) {
      console.error('카카오 로그인', error);
    }
  };
  return (
    <Wrapper>
      <Logo source={waitherLogo} />
      <LoginTitle>로그인</LoginTitle>
      <KakaoLoginBtn onPress={signInWithKakao}>
        <KakaoImage source={KakaoLogo} />
        <KaKaoLoginTitle>Kakao로 계속하기</KaKaoLoginTitle>
      </KakaoLoginBtn>
      <AppleLoginBtn onPress={() => navigation.navigate('PasswordReset')}>
        <AppleImage source={AppleLogo} />
        <AppleLoginTitle>Apple로 계속하기</AppleLoginTitle>
      </AppleLoginBtn>
      <Wrapper2>
        <EmailLoginBtn onPress={() => navigation.navigate('EmailLogin')}>
          <EmailLoginText>이메일 로그인</EmailLoginText>
        </EmailLoginBtn>
        <DivideText>|</DivideText>
        <NotLoginBtn onPress={withOutLoginOnPress}>
          <NotLoginText>로그인 없이 계속하기</NotLoginText>
          <Modal
            isVisible={isModalVisible}
            animationIn={'slideInUp'}
            animationOut={'bounceOutUp'}
            animationOutTiming={600}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
          >
            <LoginPopup>
              <LoginPopupText>
                로그인을 하지 않으면 {'\n'} 데이터가 저장되지 않아요!
              </LoginPopupText>
              <PopupBtnWrapper>
                <LoginPopupBackBtn onPress={withOutLoginOnPress}>
                  <LoginPopupBackText>돌아갈래요</LoginPopupBackText>
                </LoginPopupBackBtn>
                <LoginPopupGoodBtn
                  onPress={() => {
                    setModalVisible(!isModalVisible);
                    navigation.navigate('MainScreen');
                  }}
                >
                  <LoginPopupGoodText>괜찮아요!</LoginPopupGoodText>
                </LoginPopupGoodBtn>
              </PopupBtnWrapper>
            </LoginPopup>
          </Modal>
        </NotLoginBtn>
      </Wrapper2>
      <NotUser>아직 회원이 아니시라면</NotUser>
      {/* 화면 구성을 위한 변경 Register -> PasswordReset */}
      <EmailRegister
        onPress={() => {
          navigation.navigate('Greeting');
        }}
      >
        <EmailRegisterText>이메일로 회원가입</EmailRegisterText>
      </EmailRegister>
    </Wrapper>
  );
}
