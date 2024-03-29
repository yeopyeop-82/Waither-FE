import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import waitherLogo from '../assets/images/waither-logo.png';
import ForgotIcon from '../assets/images/ic-login-forgot.svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';
import { useTogglePasswordVisibility } from '../utils/useTogglePasswordVisibility';

const LogoWrapper = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.KeyboardAvoidingView`
  width: 95%;
  flex: 0.45;
  align-items: center;
`;

const Logo = styled.Image`
  bottom: 5px;
  position: relative;
  width: 165px;
  height: 138px;
`;

const LoginTitle = styled.Text`
  margin-bottom: 60px;
  font-size: 22px;
  font-weight: 900;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const EmailInputView = styled.View`
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EmailInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const MessageView = styled.View`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 90%;
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

const PasswordInputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const PasswordInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const ShowPassword = styled.Pressable`
  margin-right: 10px;
`;

const ForgotPassword = styled.TouchableOpacity`
  margin-top: 15px;
  padding-bottom: 1px;
`;

const ForgotPasswordWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ForgotPasswordText = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #979797;
  font-weight: 800;
`;

const LoginButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  border-radius: 40px;
  background-color: ${MAIN_COLOR};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const ErrorMessageView = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const ErrorMessage = styled.Text`
  color: ${ERROR_COLOR};
  font-size: 14px;
  margin-top: 6px;
`;

// eslint-disable-next-line react/prop-types
const EmailLogin = ({ navigation }) => {
  const [EmailisPress, setEmailIsPress] = useState(false);
  const [PasswordisPress, setPasswordIsPress] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(false);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const onChangeEmail = (text) => {
    setEmail(text);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(text)) {
      setEmailMessage('올바른 이메일 형식을 입력해주세요.');
      setIsEmail(false);
    } else {
      setEmailMessage('사용할 수 있는 이메일이에요.');
      setIsEmail(true);
    }
  };

  const onChangePassword = (text) => {
    setPassword(text);
    const passwordRegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&]).{8,64}$/;

    if (!passwordRegExp.test(text)) {
      setPasswordMessage('올바른 비밀번호 형식을 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  };

  const handleLogin = () => {
    if (email !== 'waither@example.com' || password !== 'qwer1234!') {
      setShowPasswordErrorMessage(true);
    } else {
      setShowPasswordErrorMessage(false);
    }
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo source={waitherLogo} />
        <LoginTitle>로그인</LoginTitle>
      </LogoWrapper>
      <FormWrapper behavior="padding">
        <EmailInputView
          style={{
            borderBottomColor: isEmail
              ? `${MAIN_COLOR}`
              : (EmailisPress || isEmail) && email.length >= 1
                ? `${ERROR_COLOR}`
                : `${GREY_COLOR}`,
          }}
        >
          <EmailInput
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            returnKeyType="next"
            inputMode="email"
            placeholder="이메일@example.com"
            placeholderTextColor="#ced4da"
            value={email}
            onChangeText={onChangeEmail}
            onFocus={() => {
              setEmailIsPress(true);
            }}
            onBlur={() => {
              setEmailIsPress(false);
            }}
          />
        </EmailInputView>
        <MessageView>
          {isEmail ? <ErrorImage source={notError} /> : null}
          {EmailisPress && !isEmail && email.length >= 1 ? (
            <ErrorImage source={Error} />
          ) : null}

          <Message
            style={{ color: isEmail ? `${MAIN_COLOR}` : `${ERROR_COLOR}` }}
          >
            {email.length >= 1 ? emailMessage : null}
          </Message>
        </MessageView>
        <PasswordInputView
          style={{
            borderBottomColor: isPassword
              ? `${MAIN_COLOR}`
              : (PasswordisPress || isPassword) && password.length >= 1
                ? `${ERROR_COLOR}`
                : `${GREY_COLOR}`,
          }}
        >
          <PasswordInput
            secureTextEntry={passwordVisibility}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            inputMode="email"
            placeholder="비밀번호"
            placeholderTextColor="#ced4da"
            value={password}
            onChangeText={onChangePassword}
            onFocus={() => {
              setPasswordIsPress(true);
            }}
            onBlur={() => {
              setPasswordIsPress(false);
            }}
          />
          <ShowPassword onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={30}
              color="#5189F6"
            />
          </ShowPassword>
        </PasswordInputView>
        <MessageView>
          {isPassword ? <ErrorImage source={notError} /> : null}
          {PasswordisPress && !isPassword && password.length >= 1 ? (
            <ErrorImage source={Error} />
          ) : null}

          <Message
            style={{ color: isPassword ? `${MAIN_COLOR}` : `${ERROR_COLOR}` }}
          >
            {password.length >= 1 ? passwordMessage : null}
          </Message>
        </MessageView>

        <ForgotPassword onPress={() => navigation.navigate('LoginReset')}>
          <ForgotPasswordWrapper>
            <ForgotIcon width={15} height={15} />
            <ForgotPasswordText>비밀번호를 잊으셨나요?</ForgotPasswordText>
          </ForgotPasswordWrapper>
        </ForgotPassword>
        {showPasswordErrorMessage && (
          <ErrorMessageView>
            <ErrorMessage>
              아이디 또는 비밀번호를 잘못 입력하셨습니다.
            </ErrorMessage>
            <ErrorMessage>입력하신 내용을 확인해주세요.</ErrorMessage>
          </ErrorMessageView>
        )}
      </FormWrapper>
      <LoginButton
        onPress={handleLogin}
        style={{
          backgroundColor: isEmail && isPassword ? MAIN_COLOR : GREY_COLOR,
        }}
        disabled={!isEmail || !isPassword}
      >
        <LoginButtonText>로그인하기</LoginButtonText>
      </LoginButton>
    </Wrapper>
  );
};

export default EmailLogin;
