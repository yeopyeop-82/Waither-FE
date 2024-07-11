import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskDataboxPng from '../assets/images/img-ask1-databox.png';
import { MAIN_COLOR } from '../styles/color';

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
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          console.log('No access token found');
          return;
        }

        const response = await fetch(
          'https://waither.shop/user/setting/mypage',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const data = await response.json();

        if (data.code === '200') {
          setName(data.result.nickname);
        } else {
          console.log('Failed to fetch user settings:', data.message);
        }
      } catch (error) {
        console.log('Error fetching user settings:', error);
      }
    };

    fetchUserName();

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
