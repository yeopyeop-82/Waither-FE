import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';
import waitherLogo from '../assets/images/waither-logo.png';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { useTogglePasswordVisibility } from '../utils/useTogglePasswordVisibility';

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

const FormWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const EmailInput = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 80%;
`;

const EmailInputView = styled.View`
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

const EmailVerifyTitle = styled.Text``;

const HiddenView = styled.View`
  width: 90%;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const HiddenCheck = styled.Image`
  left: 103px;
`;
const HiddenTitle = styled.Text`
  color: ${MAIN_COLOR};
  font-size: 10px;
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

const VerifyInputView = styled.View`
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
  const navigation = useNavigation();

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

  //text input이 눌렸는지
  const [PasswordisPress, setPasswordIsPress] = useState(false);
  //password 입력값 저장
  const [password, setPassword] = useState('');
  //password validation에 따른 메세지 저장
  const [passwordMessage, setPasswordMessage] = useState('');
  //password validation
  const [isPassword, setIsPassword] = useState(false);
  //password 확인 text input이 눌렸는지
  const [checkPasswordIsPress, setCheckPasswordIsPress] = useState(false);
  //기존 입력한 비밀번호와 동일한지
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  //비밀번호 동일 여부에 따른 메세지
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');
  //확인 password 입력값 저장
  const [checkPassword, setCheckPassword] = useState('');

  //이메일 변경 상태 확인 useEffect

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

  useEffect(() => {
    setIsDuplication(false);
  }, [email]);

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

  const onChangeCheckPassword = (text) => {
    setCheckPassword(text);
    if (text === password) {
      setCheckPasswordMessage('비밀번호가 일치해요.');
      setIsPasswordChecked(true);
    } else {
      setCheckPasswordMessage('비밀번호가 일치하지 않아요.');
      setIsPasswordChecked(false);
    }
  };

  return (
    <Wrapper>
      <KeyboardAwareScrollView
        scrollEnabled={isVerfiyCheck ? true : false}
        style={{ width: '100%' }}
      >
        <FormWrapper>
          <Logo source={waitherLogo} />
          <RegisterTitle>회원가입</RegisterTitle>
          <EmailInputView
            style={{
              borderBottomColor:
                EmailisPress && isEmail && !isDuplication
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
                  isEmail && !finalEmailCheck
                    ? `${MAIN_COLOR}`
                    : `${GREY_COLOR}`,
              }}
              disabled={isEmail && !finalEmailCheck ? false : true}
            >
              <DuplicationCheckTitle>중복확인</DuplicationCheckTitle>
            </DuplicationCheckBtn>
          </EmailInputView>
          <MessageView>
            {isEmail && !isDuplication ? (
              <ErrorImage source={notError} />
            ) : null}
            {/* 여기부분!! */}
            {/* email.length == 0 일때 isDuplication(false) */}
            {isDuplication ||
            (EmailisPress && !isEmail && email.length >= 1) ? (
              <ErrorImage source={Error} />
            ) : null}

            <Message
              style={{
                color:
                  isEmail && !isDuplication
                    ? `${MAIN_COLOR}`
                    : `${ERROR_COLOR}`,
              }}
            >
              {email.length >= 1 ? emailMessage : null}
            </Message>
          </MessageView>
          {isEmailVerifyReady && (
            <>
              <HiddenView>
                <EmailVerifyTitle>이메일 인증하기</EmailVerifyTitle>
                {isVerfiyCheck && (
                  <>
                    <HiddenCheck source={notError} />
                    <HiddenTitle>인증 완료</HiddenTitle>
                  </>
                )}
              </HiddenView>
              {!isVerfiyCheck ? (
                <>
                  <EmailVerifyDetailTitle>
                    입려하신 이메일로 발송된 인증번호를 입력해주세요.
                  </EmailVerifyDetailTitle>
                  <VerifyInputView
                    style={{
                      borderBottomColor: isVerfiyCheck
                        ? `${MAIN_COLOR}`
                        : !isVerfiyCheck && verifyNum.length >= 0 && isVerifyBtn
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
                    <Timer>{formatTime()}</Timer>

                    <VerifyBtn
                      onPress={CheckVerifynum}
                      disabled={verifyNum.length === 4 ? false : true}
                      style={{
                        backgroundColor:
                          // 인증번호 길이는 임시로 4로 지정
                          verifyIsPress && verifyNum.length === 4
                            ? `${MAIN_COLOR}`
                            : `${GREY_COLOR}`,
                      }}
                    >
                      <VerifyTitle>인증하기</VerifyTitle>
                    </VerifyBtn>
                  </VerifyInputView>
                  <MessageView>
                    {isVerfiyCheck ? <ErrorImage source={notError} /> : null}
                    {!isVerfiyCheck && isVerifyBtn && verifyNum.length >= 0 ? (
                      <ErrorImage source={Error} />
                    ) : null}

                    <Message
                      style={{
                        color: isVerfiyCheck
                          ? `${MAIN_COLOR}`
                          : `${ERROR_COLOR}`,
                      }}
                    >
                      {email.length >= 1 ? verifyMessage : null}
                    </Message>
                  </MessageView>
                </>
              ) : null}
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
                  style={{
                    color: isPassword ? `${MAIN_COLOR}` : `${ERROR_COLOR}`,
                  }}
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
                  autoCapitalize="none"
                  returnKeyType="next"
                  inputMode="email"
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
                    color: isPasswordChecked
                      ? `${MAIN_COLOR}`
                      : `${ERROR_COLOR}`,
                  }}
                >
                  {checkPassword.length >= 1 ? checkPasswordMessage : null}
                </Message>
              </MessageView>
            </>
          )}
        </FormWrapper>
      </KeyboardAwareScrollView>
      <RegisterCompleteBtn
        onPress={() => navigation.navigate('Greeting')}
        disabled={!isPasswordChecked}
        style={{
          backgroundColor: isPasswordChecked
            ? `${MAIN_COLOR}`
            : `${GREY_COLOR}`,
        }}
      >
        <RegisterCompleteTitle>회원가입 완료</RegisterCompleteTitle>
      </RegisterCompleteBtn>
    </Wrapper>
  );
};

export default Register;
