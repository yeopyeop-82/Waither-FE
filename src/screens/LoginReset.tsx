import React, { useState } from 'react';
import WaitherLogo from '../assets/images/waither-logo-svg.svg';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import Error from '../assets/images/Error.png';
import notError from '../assets/images/notError.png';
import Toast from 'react-native-toast-message';
import { showToast } from '../utils/showToast';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  flex: 1;
`;

const ResetHeader = styled.View`
  margin-top: 30px;
`;

const ResetMessageWrapper = styled.View`
  margin-top: 5px;
  margin-left: 17px;
`;

const ResetMessageTitle = styled.Text`
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 15px;
`;

const ResetMessage = styled.Text`
  color: rgba(0, 0, 0, 0.7);
  font-size: 17px;
  margin-bottom: 5px;
`;

const FormWrapper = styled.KeyboardAvoidingView`
  margin-top: 40px;
  width: 95%;
  align-items: center;
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

const SubmitButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 50px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  border-radius: 40px;
  background-color: ${MAIN_COLOR};
  justify-content: center;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const LoginReset = () => {
  const navigation = useNavigation();
  const [EmailisPress, setEmailIsPress] = useState(false);
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
      setEmailMessage('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  };

  const handleSubmit = () => {
    if (email !== 'waither@example.com') {
      setEmailMessage('등록된 이메일이 없습니다. 이메일을 다시 확인해주세요.');
      setIsEmail(false);
    } else {
      showToast(
        '가입된 이메일로 임시 비밀번호를 전송했어요',
        '메일함을 확인해주세요',
      );
      navigation.navigate('EmailLogin');
    }
  };

  return (
    <Wrapper>
      <ResetHeader>
        <WaitherLogo width={150} height={150} />
        <ResetMessageWrapper>
          <ResetMessageTitle>임시 비밀번호 발급</ResetMessageTitle>
          <ResetMessage>
            Waither에 가입하셨던 이메일을 입력해주세요.
          </ResetMessage>
          <ResetMessage>임시 비밀번호를 보내드릴게요.</ResetMessage>
        </ResetMessageWrapper>
      </ResetHeader>

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
      </FormWrapper>
      <SubmitButtonWrapper>
        <SubmitButton
          onPress={handleSubmit}
          style={{
            backgroundColor: isEmail ? MAIN_COLOR : GREY_COLOR,
          }}
          disabled={!isEmail}
        >
          <SubmitButtonText>임시 비밀번호 받기</SubmitButtonText>
        </SubmitButton>
      </SubmitButtonWrapper>
    </Wrapper>
  );
};

export default LoginReset;
