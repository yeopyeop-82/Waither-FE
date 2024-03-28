import React, { useState, useTransition } from 'react';
import styled from 'styled-components/native';
import waitherLogo from '../assets/images/waither-logo.png';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Animated } from 'react-native';
import { useRef } from 'react';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';

const Wrapper = styled.View`
  flex-direction: column;
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
const RegisterTitle = styled.Text`
  margin-bottom: 60px;
  font-size: 20px;
`;

const EmailInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const EmailInputView = styled.TouchableOpacity`
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DuplicationCheckBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: #ced4da;
  width: 60px;
  height: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 9px;
`;
const DuplicationCheckTitle = styled.Text`
  color: white;
  font-size: 12px;
  position: relative;
`;

const MessageView = styled.View`
  flex-direction: row;

  display: flex;
  width: 90%;
`;

const Message = styled.Text`
  color: ${ERROR_COLOR};
  font-size: 10px;
  margin-top: 6px;
`;

const ErrorImage = styled.Image`
  margin-top: 6px;
  margin-right: 3px;
`;

const EmailVerifyTitle = styled.Text`
  margin-top: 45px;
  right: 134px;
`;

const EmailVerifyDetailTitle = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 9px;
  right: 85px;
`;

const VerifyInput = styled.TextInput`
  font-size: 20px;
  padding: 5.5px 0px;
  width: 80%;
`;

const VerifyInputView = styled.TouchableOpacity`
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VerifyBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: ${MAIN_COLOR};
  width: 60px;
  height: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 9px;
`;
const VerifyTitle = styled.Text`
  color: white;
  font-size: 11.5px;
  position: relative;
`;

const RegisterCompleteBtn = styled.TouchableOpacity`
  background-color: #ced4da;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 6%;
  border-radius: 30px;
  position: absolute;
  top: 670px;
`;

const RegisterCompleteTitle = styled.Text`
  color: white;
  font-size: 17px;
`;

const Register = () => {
  const [EmailisPress, setEmailIsPress] = useState(false);
  const [PasswordisPress, setPasswordIsPress] = useState(false);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

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

  return (
    <Wrapper>
      <Logo source={waitherLogo} />
      <RegisterTitle>회원가입</RegisterTitle>
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
        <DuplicationCheckBtn>
          <DuplicationCheckTitle>중복확인</DuplicationCheckTitle>
        </DuplicationCheckBtn>
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

      <EmailVerifyTitle>이메일 인증하기</EmailVerifyTitle>
      <EmailVerifyDetailTitle>
        입려하신 이메일로 발송된 인증번호를 입력해주세요.
      </EmailVerifyDetailTitle>
      <VerifyInputView
        style={{
          borderBottomColor: PasswordisPress ? `${MAIN_COLOR}` : '#ced4da',
        }}
      >
        <VerifyInput
          placeholder="인증번호 입력"
          placeholderTextColor="#ced4da"
          onFocus={() => {
            setPasswordIsPress(true);
          }}
          onBlur={() => {
            setPasswordIsPress(false);
          }}
        ></VerifyInput>
        <VerifyBtn>
          <VerifyTitle>인증하기</VerifyTitle>
        </VerifyBtn>
      </VerifyInputView>

      <RegisterCompleteBtn>
        <RegisterCompleteTitle>회원가입 완료</RegisterCompleteTitle>
      </RegisterCompleteBtn>
    </Wrapper>
  );
};

export default Register;
