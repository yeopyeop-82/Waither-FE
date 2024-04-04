import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userNameState } from '../recoil/userNameRecoil';
import styled from 'styled-components/native';
import AskDataboxLogo from '../assets/images/img-ask1-databox.svg';
import AskDataboxPng from '../assets/images/img-ask1-databox.png';
import { MAIN_COLOR } from '../styles/color';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  flex: 1;
`;

const Logo = styled.Image`
  width: 130px;
  height: 130px;
  margin-bottom: 50px;
`;

const AskMessageWrapper = styled.View`
  align-items: center;
`;

const AskMessage = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 200;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const AskIntro = () => {
  const name = useRecoilValue(userNameState);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AskWeather');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Wrapper>
      <Logo resizeMode="contain" source={AskDataboxPng} />
      <AskMessageWrapper>
        <AskMessage>반가워요 {name} 님!</AskMessage>
        <AskMessage>
          <Bold>정확한 기상예보</Bold>를 위해
        </AskMessage>
        <AskMessage>
          {name} 님이 느낀 <Bold>어제 날씨</Bold>가 궁금해요.
        </AskMessage>
      </AskMessageWrapper>
    </Wrapper>
  );
};

export default AskIntro;
