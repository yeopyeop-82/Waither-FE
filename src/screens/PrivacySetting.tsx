import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import settingBtn from '../assets/images/VectorArrow.png';
import LoginReset from './LoginReset';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import Error from '../assets/images/Error.png';
import NotError from '../assets/images/notError.png';

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #e0e1e4;
  flex: 1;
`;

const UserInfoView = styled.View`
  flex: 0.3;
  background-color: white;
  width: 100%;
`;

const SettingMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;

const SettingContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 0.33;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  /* margin-bottom: 15px; */
`;

const SettingBtnContainer = styled.View`
  display: flex;
  background-color: white;
  width: 100%;
  position: fixed;
  top: 50px;
`;

const SettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const SettingInnerView = styled.View`
  width: 80%;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 7px;
  flex-direction: column;
`;

const SettingsView = styled.View`
  width: 100%;
  flex: 0.3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  background-color: white;
`;

const SettingSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const UserInfoContainer = styled(SettingContainer)`
  flex: 0.5;
  margin-top: 0px;
`;

const UserInfoBtn = styled(SettingBtn)``;

const UserInfoTitle = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`;

const UserEmail = styled.Text`
  font-size: 23px;
  font-weight: 600;
  color: #9f9f9f;
`;

const UserInfoInnerView = styled(SettingInnerView)`
  width: 100%;
`;

const NameInputView = styled.View`
  width: 90%;

  border-color: #ced4da;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const MessageView = styled.View`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 90%;
  margin-bottom: 20px;
`;

const Message = styled.Text`
  color: ${ERROR_COLOR};
  font-size: 12px;
  margin-top: 6px;
`;

const ErrorImage = styled.Image`
  margin-top: 6px;
  margin-right: 3px;
`;

const NameCheckBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: ${MAIN_COLOR};
  width: 60px;
  height: 25px;
  justify-content: center;
  align-items: center;
  right: 0px;
  position: absolute;
`;

const NameCheckTitle = styled.Text`
  color: white;
  font-size: 11.5px;
  position: relative;
`;

const PrivacySetting = () => {
  const navigation = useNavigation();
  const [isEditingName, setIsEditingName] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [inputName, setInputName] = useState(name);

  const onChangeName = (text) => {
    setInputName(text);
    const nameRegExp = /^[a-zA-Z0-9가-힣]{1,7}$/;

    if (!nameRegExp.test(text)) {
      setNameMessage('성함은 1~7자 사이여야 해요.');
      setIsNameValid(false);
    } else {
      setNameMessage('사용할 수 있는 성함이에요.');
      setIsNameValid(true);
    }
  };

  const handleNameChange = () => {
    if (isEditingName) {
      // 이름이 편집 중일 때만 Recoil 상태에 저장합니다.
      setIsEditingName(false);
      setName(inputName);
      nicknamePut();
    } else {
      setIsEditingName(true);
    }
  };

  const onPressLogout = () => {
    navigation.navigate('Login');
    LogoutPost();
  };

  //===============================================================

  //Bearer 토큰
  const authorization =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsLmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MjA1MTI2ODUsImV4cCI6MTcyMDUxNjI4NX0.InQvkKjgv0x0AwD--eZ4gTX5MrZPLBx-f_Vm7zIlojg';

  //사용자 정보 호출
  const userInfoGet = async () => {
    const url = 'https://waither.shop/user/setting/mypage';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      setName(res.result.nickname);
      setEmail(res.result.email);
      setInputName(res.result.nickname);
      console.log('사용자 정보 불러오기', res);
    } catch (error) {
      console.error('사용자 정보 불러오기', error);
    }
  };

  useEffect(() => {
    userInfoGet();
  }, []);

  //닉네임 변경 호출
  const nicknamePut = async () => {
    const url = 'https://waither.shop/user/nickname';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      nickname: inputName,
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      console.log('닉네임 변경', res);
    } catch (error) {
      console.error('닉네임 변경', error);
    }
  };

  //로그아웃 호출
  const LogoutPost = async () => {
    const url = 'https://waither.shop/user/logout';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      console.log('로그아웃 성공', res);
    } catch (error) {
      console.error('로그아웃 에러', error);
    }
  };

  //===============================================================
  return (
    <Wrapper>
      <UserInfoView>
        <UserInfoContainer>
          <UserInfoInnerView>
            <UserInfoTitle>이메일 아이디</UserInfoTitle>
            <UserEmail>{email}</UserEmail>
          </UserInfoInnerView>
        </UserInfoContainer>
        <UserInfoContainer>
          <UserInfoInnerView>
            <UserInfoTitle>이름</UserInfoTitle>
            <NameInputView
              style={{
                borderBottomColor: isNameValid
                  ? `${MAIN_COLOR}`
                  : (isEditingName || isNameValid) && name.length >= 1
                    ? `${ERROR_COLOR}`
                    : `${GREY_COLOR}`,
                borderBottomWidth: isEditingName ? 1 : 0,
              }}
            >
              <NameInput
                autoCorrect={false}
                autoCapitalize="none"
                autoFocus
                returnKeyType="next"
                inputMode="text"
                placeholder="이름"
                value={inputName}
                placeholderTextColor="#ced4da"
                onChangeText={onChangeName}
                editable={isEditingName}
              />
              <NameCheckBtn
                onPress={handleNameChange}
                style={{
                  backgroundColor: isNameValid
                    ? `${MAIN_COLOR}`
                    : `${GREY_COLOR}`,
                }}
                disabled={isNameValid ? false : true}
              >
                <NameCheckTitle>
                  {isEditingName ? '완료' : '변경하기'}
                </NameCheckTitle>
              </NameCheckBtn>
            </NameInputView>
            {isEditingName ? (
              <MessageView>
                {isEditingName && !isNameValid && name.length >= 1 ? (
                  <ErrorImage source={Error} />
                ) : (
                  <ErrorImage source={NotError} />
                )}

                <Message
                  style={{
                    color: isNameValid ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
                  }}
                >
                  {name.length >= 1 ? nameMessage : null}
                </Message>
              </MessageView>
            ) : (
              <MessageView>
                <Message> </Message>
              </MessageView>
            )}
          </UserInfoInnerView>
        </UserInfoContainer>
      </UserInfoView>

      <SettingsView>
        {[
          { title: '비밀번호 재설정', navigate: 'PasswordReset' },
          { title: '로그아웃', logout: onPressLogout },
          { title: '회원탈퇴' },
        ].map((setting, index) => (
          <SettingContainer key={index}>
            <SettingBtn
              onPress={() => {
                if (index == 0) {
                  navigation.navigate(setting.navigate);
                } else if (index == 1) {
                  setting.logout();
                }
              }}
            >
              <SettingInnerView>
                <SettingMainTitle>{setting.title}</SettingMainTitle>
              </SettingInnerView>
              <SettingArrow source={settingBtn}></SettingArrow>
            </SettingBtn>
          </SettingContainer>
        ))}
      </SettingsView>

      {/* <SettingsView>
        <SettingContainer>
          <SettingBtnContainer>
            <SettingBtn
              onPress={() => {
                navigation.navigate('PasswordReset');
              }}
            >
              <SettingInnerView>
                <SettingMainTitle>비밀번호 재설정</SettingMainTitle>
              </SettingInnerView>
              <SettingArrow source={settingBtn}></SettingArrow>
            </SettingBtn>
            <SettingBtn onPress={onPressLogout}>
              <SettingInnerView>
                <SettingMainTitle>로그아웃</SettingMainTitle>
              </SettingInnerView>
              <SettingArrow source={settingBtn}></SettingArrow>
            </SettingBtn>
            <SettingBtn>
              <SettingInnerView>
                <SettingMainTitle>회원 탈퇴</SettingMainTitle>
              </SettingInnerView>
              <SettingArrow source={settingBtn}></SettingArrow>
            </SettingBtn>
          </SettingBtnContainer>
      </SettingContainer>
      </SettingsView> */}
    </Wrapper>
  );
};

export default PrivacySetting;
