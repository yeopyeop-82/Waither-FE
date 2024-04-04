import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ERROR_COLOR, GREY_COLOR, MAIN_COLOR } from '../styles/color';
import Error from '../assets/images/Error.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userNameState } from '../recoil/recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const GreetNamingWrapper = styled.View`
  margin-top: 60px;
  width: 90%;
`;

const GreetNamingTitle = styled.Text`
  font-size: 25px;
  font-weight: 800;
`;

const NameInputView = styled.View`
  width: 90%;
  margin-top: 15px;
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

const GreetNaming = () => {
  const navigation = useNavigation();
  const [NameisPress, setNameIsPress] = useState(false);
  const [name, setName] = useRecoilState(userNameState);
  const [nameMessage, setNameMessage] = useState('');
  const [isName, setIsName] = useState(false);

  const onChangeName = (text) => {
    setName(text);
    const nameRegExp = /^[a-zA-Z0-9가-힣]{1,7}$/;

    if (!nameRegExp.test(text)) {
      setNameMessage('성함은 1~7자 사이여야 해요.');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  };

  const storeName = async (name) => {
    try {
      await AsyncStorage.setItem('userName', name);
      console.log('저장됨');
    } catch (e) {
      console.log("Error storing user's name:", e);
    }
  };

  const handleSubmit = () => {
    if (isName) {
      storeName(name);
      navigation.navigate('AskIntro');
    }
  };

  return (
    <Wrapper>
      <GreetNamingWrapper>
        <GreetNamingTitle>제가 뭐라고 부르면 될까요 ?</GreetNamingTitle>
      </GreetNamingWrapper>
      <NameInputView
        style={{
          borderBottomColor: isName
            ? `${MAIN_COLOR}`
            : (NameisPress || isName) && name.length >= 1
              ? `${ERROR_COLOR}`
              : `${GREY_COLOR}`,
        }}
      >
        <NameInput
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          returnKeyType="next"
          inputMode="text"
          placeholder="추워하는 곰탱이"
          placeholderTextColor="#ced4da"
          value={name}
          onChangeText={onChangeName}
          onFocus={() => {
            setNameIsPress(true);
          }}
          onBlur={() => {
            setNameIsPress(false);
          }}
        />
      </NameInputView>
      <MessageView>
        {NameisPress && !isName && name.length >= 1 ? (
          <ErrorImage source={Error} />
        ) : null}

        <Message style={{ color: isName ? `${MAIN_COLOR}` : `${ERROR_COLOR}` }}>
          {name.length >= 1 ? nameMessage : null}
        </Message>
      </MessageView>
      <SubmitButtonWrapper>
        <SubmitButton
          style={{
            backgroundColor: isName ? MAIN_COLOR : GREY_COLOR,
          }}
          disabled={!isName}
          onPress={handleSubmit}
        >
          <SubmitButtonText>완료</SubmitButtonText>
        </SubmitButton>
      </SubmitButtonWrapper>
    </Wrapper>
  );
};

export default GreetNaming;
