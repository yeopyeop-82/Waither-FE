import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskDataboxPng from '../assets/images/img-ask1-databox-check.png';
import {
  userFeelingTimeZoneState,
  userFeelingWeatherState,
  userNameState,
  userNotificationTimeState,
} from '../recoil/userInitInfoRecoil';
import { MAIN_COLOR } from '../styles/color';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  flex: 1;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
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

const AskOutro = () => {
  const [name, setName] = useRecoilState(userNameState);
  const feelingWeather = useRecoilValue(userFeelingWeatherState);
  const feelingTimeZone = useRecoilValue(userFeelingTimeZoneState);
  const notificationTime = useRecoilValue(userNotificationTimeState);

  useEffect(() => {
    const fetchUserSettings = async () => {
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

    fetchUserSettings();
  }, [setName]);

  useEffect(() => {
    const submitSurvey = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          console.log('No access token found');
          return;
        }

        const surveyResponse = await fetch(
          'https://waither.shop/user/survey/submit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              ans: feelingWeather,
              time: new Date().toISOString(),
            }),
          },
        );

        if (!surveyResponse.ok) {
          console.log('Failed to submit survey:', surveyResponse.statusText);
        }
      } catch (error) {
        console.log('Error submitting survey:', error);
      }
    };

    const setNotification = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          console.log('No access token found');
          return;
        }

        const notificationHour = notificationTime.slice(0, 2);
        const notificationMinute = notificationTime.slice(2, 4);

        const notificationResponse = await fetch(
          'https://waither.shop/setting/noti/out-alert-set',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              days: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              outTime: `${notificationHour}:${notificationMinute}:00`,
            }),
          },
        );

        if (!notificationResponse.ok) {
          console.log(
            'Failed to set notification:',
            notificationResponse.statusText,
          );
        }
      } catch (error) {
        console.log('Error setting notification:', error);
      }
    };

    if (feelingWeather && feelingTimeZone && notificationTime) {
      submitSurvey();
      setNotification();
    }
  }, [feelingWeather, feelingTimeZone, notificationTime]);

  return (
    <Wrapper>
      <Logo resizeMode="contain" source={AskDataboxPng} />
      <AskMessageWrapper>
        <AskMessage>{name} 님의</AskMessage>
        <AskMessage style={{ marginBottom: 30 }}>
          데이터가 저장되었어요.
        </AskMessage>
        <AskMessage>이제 웨이더가</AskMessage>
        <AskMessage>
          {name} 님에게 <Bold>꼭 맞는</Bold>
        </AskMessage>
        <AskMessage>
          <Bold>기상예보를 보내드릴게요.</Bold>
        </AskMessage>
        <AskMessage>
          이름 : {name} / 어제 날씨 : {feelingWeather}
        </AskMessage>
        <AskMessage>
          춥/덥다고 느낀 시간 : {feelingTimeZone} / 알림시간 :{' '}
          {notificationTime}
        </AskMessage>
      </AskMessageWrapper>
    </Wrapper>
  );
};

export default AskOutro;
