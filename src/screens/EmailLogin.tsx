import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import waitherLogo from '../assets/images/waither-logo.png';
import ForgotIcon from '../assets/images/ic-login-forgot.svg';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';

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

const EmailInputView = styled.TouchableOpacity`
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
  top: 670px;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const EmailLogin = () => {
  const [EmailisPress, setEmailIsPress] = useState(false);
  const [PasswordisPress, setPasswordIsPress] = useState(false);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPassword, setIsPassword] = useState(false);

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

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo source={waitherLogo} />
        <LoginTitle>로그인</LoginTitle>
      </LogoWrapper>
      <FormWrapper behavior="padding">
        <EmailInputView
          style={{
            borderBottomColor:
              EmailisPress && isEmail
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
            placeholder="이메일@naver.com"
            placeholderTextColor="#ced4da"
            value={email}
            onChangeText={onChangeEmail}
            onFocus={() => {
              setEmailIsPress(true);
            }}
            onBlur={() => {
              setEmailIsPress(false);
            }}
          ></EmailInput>
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
            borderBottomColor:
              PasswordisPress && isPassword
                ? `${MAIN_COLOR}`
                : (PasswordisPress || isPassword) && password.length >= 1
                  ? `${ERROR_COLOR}`
                  : `${GREY_COLOR}`,
          }}
        >
          <PasswordInput
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
          ></PasswordInput>
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
        <ForgotPassword>
          <ForgotPasswordWrapper>
            <ForgotIcon width={15} height={15} />
            <ForgotPasswordText>비밀번호를 잊으셨다면 ?</ForgotPasswordText>
          </ForgotPasswordWrapper>
        </ForgotPassword>
      </FormWrapper>
      <LoginButton>
        <LoginButtonText>로그인하기</LoginButtonText>
      </LoginButton>
    </Wrapper>
  );
};

export default EmailLogin;
