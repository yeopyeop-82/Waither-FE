import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const PasswordResetTitle = styled.Text`
  margin-top: 60px;
  right: 110px;
  font-size: 22px;
`;

const PasswordInputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const PasswordInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const PasswordCheckBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: ${GREY_COLOR};
  width: 60px;
  height: 25px;
  justify-content: center;
  align-items: center;
  right: 0px;
  position: absolute;
`;

const PasswordCheckTitle = styled.Text`
  color: white;
  font-size: 11.5px;
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

const TestPassword = 'waither';
const PasswordReset = () => {
  //현재 비밀번호 확인 버튼이 눌렸는지
  const [isPasswordCheckBtn, setIsPasswordCheckBtn] = useState(false);
  //password 입력값 저장
  const [password, setPassword] = useState('');
  //password validation에 따른 메세지 저장
  const [passwordMessage, setPasswordMessage] = useState('');
  //password validation
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const CheckCurrentPassword = () => {
    setIsPasswordCheckBtn(true);
    if (password == TestPassword) {
      setIsPasswordChecked(true);
      setPasswordMessage('현재 비밀번호가 확인되었어요.');
    } else {
      setIsPasswordChecked(false);
      if (password.length >= 1) {
        setPasswordMessage('비밀번호가 일치하지 않아요.');
      }
    }
  };

  return (
    <Wrapper>
      <PasswordResetTitle>비밀번호 재설정</PasswordResetTitle>
      <PasswordInputView>
        <PasswordInput
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          inputMode="email"
          placeholder="현재 비밀번호 확인"
          placeholderTextColor="#ced4da"
          onChangeText={onChangePassword}
          editable={isPasswordChecked ? false : true}
        ></PasswordInput>
        <PasswordCheckBtn
          style={{
            backgroundColor:
              password.length >= 1 && !isPasswordChecked
                ? `${MAIN_COLOR}`
                : `${GREY_COLOR}`,
          }}
          onPress={CheckCurrentPassword}
          disabled={isPasswordChecked || password.length <= 0 ? true : false}
        >
          {isPasswordChecked ? (
            <PasswordCheckTitle>확인완료</PasswordCheckTitle>
          ) : (
            <PasswordCheckTitle>확인</PasswordCheckTitle>
          )}
        </PasswordCheckBtn>
      </PasswordInputView>
      <MessageView>
        {isPasswordCheckBtn && isPasswordChecked ? (
          <ErrorImage source={notError} />
        ) : null}
        {password.length >= 0 && isPasswordCheckBtn && !isPasswordChecked ? (
          <ErrorImage source={Error} />
        ) : null}

        <Message
          style={{
            color:
              isPasswordChecked && isPasswordCheckBtn
                ? `${MAIN_COLOR}`
                : `${ERROR_COLOR}`,
          }}
        >
          {passwordMessage}
        </Message>
      </MessageView>
    </Wrapper>
  );
};

export default PasswordReset;
