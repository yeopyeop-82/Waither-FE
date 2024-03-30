import React, { useEffect, useState, useTransition } from 'react';
import styled from 'styled-components/native';
import waitherLogo from '../assets/images/waither-logo.png';
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
  background-color: ${GREY_COLOR};
  width: 60px;
  height: 25px;
  justify-content: center;
  align-items: center;
  right: 0px;
  position: absolute;
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

const Timer = styled.Text`
  color: ${MAIN_COLOR};
  margin-top: 4px;
  right: 25px;
`;

const ShowPassword = styled.Pressable`
  margin-right: 10px;
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

const TestEmail = 'abcde@naver.com';
const TestNum = '0000';

const Register = () => {
  //text input이 눌렸는지
  const [EmailisPress, setEmailIsPress] = useState(false);
  //입력값 저장
  const [email, setEmail] = useState('');
  //상태에 따른 메시지
  const [emailMessage, setEmailMessage] = useState('');
  //이메일 validation 검증
  const [isEmail, setIsEmail] = useState(false);
  //이메일 중복 여부 검증
  const [isDuplication, setIsDuplication] = useState(false);
  //이메일 input editable false를 위한 state
  const [finalEmailCheck, setFinalEmailCheck] = useState(false);

  //text input이 눌렸는지
  const [verifyIsPress, setVerifyIsPress] = useState(false);
  //입력값 저장
  const [verifyNum, setVerifyNum] = useState('');
  //상태에 따른 메시지
  const [verifyMessage, setVerifyMessage] = useState('');
  //이메일 중복 여부 완료 시 인증번호 입력 칸을 뛰게하기 위함
  const [isEmailVerifyReady, setIsEmailVerifyReady] = useState(false);
  //인증번호 인증 여부
  const [isVerfiyCheck, setIsVerfityCheck] = useState(false);
  //인증버튼이 눌려야 인풋 뷰의 색깔이 바뀌도록
  const [isVerifyBtn, setIsVerifyBtn] = useState(false);

  const [PasswordisPress, setPasswordIsPress] = useState(false);

  const [showPasswordErrorMessage, setShowPasswordErrorMessage] =
    useState(false);
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  const [checkPasswordIsPress, setCheckPasswordIsPress] = useState(false);
  const [isPasswordChecked, setisPasswordChecked] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [timer, setTimer] = useState(299);
  //타이머 함수
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (finalEmailCheck) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);

            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [finalEmailCheck]);

  const onChangeEmail = (text) => {
    setEmail(text);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(text)) {
      setEmailMessage('올바른 이메일 형식을 입력해주세요.');
      setIsEmail(false);
    } else {
      setEmailMessage('이메일 형식이 맞습니다');
      setIsEmail(true);
    }
  };

  const CheckEmail = () => {
    if (email == TestEmail) {
      setEmailMessage('이미 사용하고 있는 이메일이에요.');
      setIsDuplication(true);
    } else {
      setEmailMessage('사용할 수 있는 이메일이에요.');
      setIsDuplication(false);
      setIsEmailVerifyReady(true);
      setFinalEmailCheck(true);
    }
  };

  const onChangeVerifyNum = (text) => {
    setVerifyNum(text);
  };

  const CheckVerifynum = () => {
    setIsVerifyBtn(true);
    if (TestNum == verifyNum) {
      setVerifyMessage('인증이 완료되었어요.');
      setIsVerfityCheck(true);
    } else {
      setVerifyMessage('인증번호가 일치하지 않아요. 다시 한 번 확인해주세요.');
      setIsVerfityCheck(false);
    }
  };

  const onChangePassword = (text) => {
    setPassword(text);
    const passwordRegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&]).{8,64}$/;

    if (!passwordRegExp.test(text)) {
      setPasswordMessage('비밀번호는 최소 8자리 이상이어야 합니다.');
      setIsPassword(false);
    } else {
      setPasswordMessage('사용할 수 있는 비밀번호에요.');
      setIsPassword(true);
    }
  };

  const onChangeCheckPassword = (test) => {
    setCheckPassword(test);
    if (checkPassword == password) {
      setCheckPasswordMessage('비밀번호가 일치해요.');
      setisPasswordChecked(true);
    } else {
      setCheckPasswordMessage('비밀번호가 일치하지 않아요.');
      setisPasswordChecked(false);
    }
  };

  const CheckPassword = () => {};
  console.log(password);
  console.log(checkPassword);
  console.log(isPasswordChecked);
  console.log(checkPasswordMessage);

  return (
    <Wrapper>
      <Logo source={waitherLogo} />
      <RegisterTitle>회원가입</RegisterTitle>
      <EmailInputView
        style={{
          borderBottomColor:
            (EmailisPress && isEmail) || finalEmailCheck
              ? `${MAIN_COLOR}`
              : (!isEmail || EmailisPress) && email.length >= 1
                ? `${ERROR_COLOR}`
                : `${GREY_COLOR}`,
        }}
      >
        <EmailInput
          autoCorrect={false}
          spellCheck={false}
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
          editable={finalEmailCheck ? false : true}
        ></EmailInput>

        <DuplicationCheckBtn
          onPress={CheckEmail}
          style={{
            backgroundColor:
              isEmail && !finalEmailCheck ? `${MAIN_COLOR}` : `${GREY_COLOR}`,
          }}
        >
          <DuplicationCheckTitle>중복확인</DuplicationCheckTitle>
        </DuplicationCheckBtn>
      </EmailInputView>
      <MessageView>
        {isEmail && !isDuplication ? <ErrorImage source={notError} /> : null}
        {isDuplication || (EmailisPress && !isEmail && email.length >= 1) ? (
          <ErrorImage source={Error} />
        ) : null}

        <Message
          style={{
            color:
              isEmail && !isDuplication ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
          }}
        >
          {email.length >= 1 ? emailMessage : null}
        </Message>
      </MessageView>
      {isEmailVerifyReady && (
        <>
          <EmailVerifyTitle>이메일 인증하기</EmailVerifyTitle>
          <EmailVerifyDetailTitle>
            입려하신 이메일로 발송된 인증번호를 입력해주세요.
          </EmailVerifyDetailTitle>
          <VerifyInputView
            style={{
              borderBottomColor: isVerfiyCheck
                ? `${MAIN_COLOR}`
                : (isEmail || EmailisPress) && email.length >= 1
                  ? `${ERROR_COLOR}`
                  : `${GREY_COLOR}`,
            }}
          >
            <VerifyInput
              placeholder="인증번호 입력"
              placeholderTextColor="#ced4da"
              autoCorrect={false}
              spellCheck={false}
              value={verifyNum}
              editable={isVerfiyCheck ? false : true}
              onChangeText={onChangeVerifyNum}
              onFocus={() => {
                setVerifyIsPress(true);
              }}
              onBlur={() => {
                setVerifyIsPress(false);
              }}
            ></VerifyInput>
            {finalEmailCheck && !isVerfiyCheck ? (
              <Timer>{formatTime()}</Timer>
            ) : null}
            <VerifyBtn
              onPress={CheckVerifynum}
              style={{
                backgroundColor: verifyIsPress
                  ? `${MAIN_COLOR}`
                  : `${GREY_COLOR}`,
              }}
            >
              <VerifyTitle>인증하기</VerifyTitle>
            </VerifyBtn>
          </VerifyInputView>
          <MessageView>
            {isVerfiyCheck ? <ErrorImage source={notError} /> : null}
            {!isVerfiyCheck && isVerifyBtn && verifyNum.length >= 1 ? (
              <ErrorImage source={Error} />
            ) : null}

            <Message
              style={{
                color: isVerfiyCheck ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
              }}
            >
              {email.length >= 1 ? verifyMessage : null}
            </Message>
          </MessageView>

          <RegisterCompleteBtn>
            <RegisterCompleteTitle>회원가입 완료</RegisterCompleteTitle>
          </RegisterCompleteBtn>
        </>
      )}
      {isVerfiyCheck && (
        <>
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
          <CheckPasswordInputView
            style={{
              borderBottomColor: isPasswordChecked
                ? `${MAIN_COLOR}`
                : (checkPasswordIsPress || checkPassword) &&
                    checkPassword.length >= 1
                  ? `${ERROR_COLOR}`
                  : `${GREY_COLOR}`,
            }}
          >
            <CheckPasswordInput
              secureTextEntry={passwordVisibility}
              autoCorrect={false}
              // autoCapitalize="none"
              // returnKeyType="next"
              // inputMode="email"
              placeholder="비밀번호"
              placeholderTextColor="#ced4da"
              value={checkPassword}
              onChangeText={onChangeCheckPassword}
              onFocus={() => {
                setCheckPasswordIsPress(true);
              }}
              onBlur={() => {
                setCheckPasswordIsPress(false);
              }}
            />
            <ShowPassword onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={30}
                color="#5189F6"
              />
            </ShowPassword>
          </CheckPasswordInputView>
          <MessageView>
            {isPasswordChecked ? <ErrorImage source={notError} /> : null}
            {checkPasswordIsPress &&
            !isPasswordChecked &&
            checkPassword.length >= 1 ? (
              <ErrorImage source={Error} />
            ) : null}

            <Message
              style={{
                color: isPasswordChecked ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
              }}
            >
              {password.length >= 1 ? checkPasswordMessage : null}
            </Message>
          </MessageView>
        </>
      )}
    </Wrapper>
  );
};

export default Register;
