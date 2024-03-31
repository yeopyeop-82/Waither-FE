import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';
import { useTogglePasswordVisibility } from '../utils/useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
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

const PasswordResetTitle = styled.Text`
  margin-top: 80px;
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

const ShowPassword = styled.Pressable`
  margin-right: 10px;
`;

const NewPasswordInputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const NewPasswordInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const CheckPasswordInputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const CheckPasswordInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const ReSettingBtn = styled.TouchableOpacity`
  background-color: #ced4da;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 6%;
  border-radius: 30px;
  position: absolute;
  top: 670px;
`;

const ReSettingBtnTitle = styled.Text`
  color: white;
  font-size: 17px;
`;

const TestPassword = 'waither';
const PasswordReset = () => {
  //현재 비밀번호 확인 버튼이 눌렸는지
  const [isPasswordCheckBtnPressed, setIsPasswordCheckBtnPressed] =
    useState(false);
  //password 입력값 저장
  const [password, setPassword] = useState('');
  //password validation에 따른 메세지 저장
  const [passwordMessage, setPasswordMessage] = useState('');
  //password validation
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  //변경할 비밀번호
  const [newPassword, setNewPassword] = useState('');
  //New password validation에 따른 메세지 저장
  const [newPasswordMessage, setNewPasswordMessage] = useState('');
  //New password validation
  const [isNewPasswordChecked, setIsNewPasswordChecked] = useState(false);
  //New password text input이 눌렸는지
  const [newPasswordIsPress, setNewPasswordIsPress] = useState(false);

  //변경할 비밀번호와 동일한지
  const [isPasswordEqual, setIsPasswordEqual] = useState(false);
  //비밀번호 동일 여부에 따른 메세지
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');
  //확인 password 입력값 저장
  const [checkPassword, setCheckPassword] = useState('');
  //확인 password text input이 눌렸는지
  const [checkPasswordIsPress, setCheckPasswordIsPress] = useState(false);

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const CheckCurrentPassword = () => {
    setIsPasswordCheckBtnPressed(true);
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

  const onChangeNewPassword = (text) => {
    setNewPassword(text);
    const passwordRegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&]).{8,64}$/;

    if (!passwordRegExp.test(text)) {
      setNewPasswordMessage('비밀번호는 최소 8자리 이상이어야 합니다.');
      setIsNewPasswordChecked(false);
    } else {
      setNewPasswordMessage('사용할 수 있는 비밀번호에요.');
      setIsNewPasswordChecked(true);
    }
  };

  const onChangeCheckPassword = (text) => {
    setCheckPassword(text);
    if (newPassword === text) {
      setCheckPasswordMessage('비밀번호가 일치해요.');
      setIsPasswordEqual(true);
    } else {
      setCheckPasswordMessage('비밀번호가 일치하지 않아요.');
      setIsPasswordEqual(false);
    }
  };

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <Wrapper>
      <PasswordResetTitle>비밀번호 재설정</PasswordResetTitle>
      <PasswordInputView
        style={{
          borderBottomColor: isPasswordChecked
            ? `${MAIN_COLOR}`
            : isPasswordCheckBtnPressed
              ? `${ERROR_COLOR}`
              : `${GREY_COLOR}`,
        }}
      >
        <PasswordInput
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          returnKeyType="next"
          inputMode="email"
          placeholder="현재 비밀번호 확인"
          placeholderTextColor="#ced4da"
          onChangeText={onChangePassword}
          value={password}
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
        {isPasswordCheckBtnPressed && isPasswordChecked ? (
          <ErrorImage source={notError} />
        ) : null}
        {password.length >= 0 &&
        isPasswordCheckBtnPressed &&
        !isPasswordChecked ? (
          <ErrorImage source={Error} />
        ) : null}

        <Message
          style={{
            color:
              isPasswordChecked && isPasswordCheckBtnPressed
                ? `${MAIN_COLOR}`
                : `${ERROR_COLOR}`,
          }}
        >
          {passwordMessage}
        </Message>
      </MessageView>
      {isPasswordChecked && (
        <>
          <NewPasswordInputView
            style={{
              borderBottomColor: isNewPasswordChecked
                ? `${MAIN_COLOR}`
                : newPasswordIsPress && newPassword.length >= 1
                  ? `${ERROR_COLOR}`
                  : `${GREY_COLOR}`,
            }}
          >
            <NewPasswordInput
              secureTextEntry={passwordVisibility}
              autoCorrect={false}
              spellCheck={false}
              autoCapitalize="none"
              returnKeyType="next"
              inputMode="email"
              placeholder="변경할 비밀번호"
              placeholderTextColor="#ced4da"
              value={newPassword}
              onChangeText={onChangeNewPassword}
              onFocus={() => {
                setNewPasswordIsPress(true);
              }}
              onBlur={() => {
                setNewPasswordIsPress(false);
              }}
            ></NewPasswordInput>
            <ShowPassword onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={30}
                color="#5189F6"
              />
            </ShowPassword>
          </NewPasswordInputView>
          <MessageView>
            {isNewPasswordChecked ? <ErrorImage source={notError} /> : null}
            {newPassword.length > 0 && !isNewPasswordChecked ? (
              <ErrorImage source={Error} />
            ) : null}

            <Message
              style={{
                color: isNewPasswordChecked
                  ? `${MAIN_COLOR}`
                  : `${ERROR_COLOR}`,
              }}
            >
              {newPassword.length >= 1 ? newPasswordMessage : null}
            </Message>
          </MessageView>
          <CheckPasswordInputView
            style={{
              borderBottomColor: isPasswordEqual
                ? `${MAIN_COLOR}`
                : checkPasswordIsPress && checkPassword.length >= 1
                  ? `${ERROR_COLOR}`
                  : `${GREY_COLOR}`,
            }}
          >
            <CheckPasswordInput
              secureTextEntry={passwordVisibility}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              inputMode="email"
              placeholder="비밀번호"
              placeholderTextColor="#ced4da"
              onChangeText={onChangeCheckPassword}
              value={checkPassword}
              onFocus={() => {
                setCheckPasswordIsPress(true);
              }}
              onBlur={() => {
                setCheckPasswordIsPress(false);
              }}
            ></CheckPasswordInput>
            <ShowPassword onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={30}
                color="#5189F6"
              />
            </ShowPassword>
          </CheckPasswordInputView>
          <MessageView>
            {isPasswordEqual ? <ErrorImage source={notError} /> : null}
            {checkPassword.length >= 1 && !isPasswordEqual ? (
              <ErrorImage source={Error} />
            ) : null}

            <Message
              style={{
                color: isPasswordEqual ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
              }}
            >
              {checkPassword.length >= 1 ? checkPasswordMessage : null}
            </Message>
          </MessageView>
        </>
      )}
      <ReSettingBtn
        disabled={isPasswordEqual ? false : true}
        style={{
          backgroundColor: isPasswordEqual ? `${MAIN_COLOR}` : `${GREY_COLOR}`,
        }}
      >
        <ReSettingBtnTitle>재설정</ReSettingBtnTitle>
      </ReSettingBtn>
    </Wrapper>
  );
};

export default PasswordReset;
