import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { userWindState } from '../recoil/userDataRecoil';
import WindGroup from '../assets/images/wind_group.svg';
import WindPowerImage from '../assets/images/wind_power.svg';
import Slider from '@react-native-community/slider';
import authTokens from '../utils/authTokens.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.7;
  flex-direction: row;
  width: 90%;
  border-radius: 8px;
  margin-top: 20px;
  background-color: white;
  align-items: center;
`;

const ToggleSwitch = styled.Switch`
  transform: scale(0.8);
  margin-right: 17px;
`;

const CustomServiceTitleView = styled.View`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100%;
  flex: 1;
  margin-left: 15px;
`;
const CustomServiceMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const CustomServiceSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const WindHeaderView = styled.View`
  flex: 0.25;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const WindHeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
`;
const WindHeaderSubtitle = styled.Text`
  font-size: 15px;
  color: white;
`;

const WindSliderView = styled.View`
  flex: 0.8;
  width: 100%;
  background-color: white;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* 모든 요소들을 수평 중앙 정렬 */
`;

const WindSliderContainer = styled.View`
  height: 10px;
  width: 10px;
  margin-left: 30px;
  margin-right: -8px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const WindSliderWrapper = styled.View`
  transform: rotate(-90deg);
`;

const WindGroupImageView = styled.View``;

const SettingWind = () => {
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const [userWind, setUserWind] = useRecoilState(userWindState); // 바람 세기를 0으로 초기화
  const toggleSwitch = () =>
    setIsCustomServiceEnabled((previousState) => !previousState);
  const name = useRecoilValue(userNameState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      windPut();
    }
  }, [isCustomServiceEnabled, userWind]);

  //===============================================================
  //바람 세기 호출
  const windPut = async () => {
    const url = 'https://waither.shop/user/setting/noti/wind';
    const token = await AsyncStorage.getItem('accessToken');
    const accessToken = 'Bearer ' + token;
    const headers = {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      windAlert: isCustomServiceEnabled,
      windDegree: Math.round(userWind),
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      console.log('바람 설정', res);
    } catch (error) {
      console.error('바람 설정', error);
    }
  };

  const windGet = async () => {
    const url = 'https://waither.shop/user/setting/noti/wind';
    const token = await AsyncStorage.getItem('accessToken');
    const accessToken = 'Bearer ' + token;
    const headers = {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      setIsCustomServiceEnabled(res.result.windAlert);
      setUserWind(res.result.windDegree);
      setIsLoading(true);
      console.log('바람 설정', res);
    } catch (error) {
      console.error('바람 설정', error);
    }
  };

  useEffect(() => {
    windGet();
  }, []);

  return (
    <Wrapper>
      <WindHeaderView>
        <WindHeaderTitle>{Math.round(userWind)} m/s</WindHeaderTitle>
        <WindHeaderSubtitle>
          {name}님이 설정한 바람 세기를 넘으면 알려드릴게요 !
        </WindHeaderSubtitle>
        <UserCustomSettingView>
          <CustomServiceTitleView>
            <CustomServiceMainTitle>바람 세기 예보 받기</CustomServiceMainTitle>
            <CustomServiceSubTitle>
              {name}님이 설정한 바람 세기
            </CustomServiceSubTitle>
          </CustomServiceTitleView>
          <ToggleSwitch
            value={isCustomServiceEnabled}
            onValueChange={toggleSwitch}
            //toggle 활성화 여부에 따른 색상 설정
            trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
          ></ToggleSwitch>
        </UserCustomSettingView>
      </WindHeaderView>
      <WindSliderView>
        <WindGroupImageView>
          <WindGroup height={450} />
        </WindGroupImageView>
        <WindSliderContainer>
          <WindSliderWrapper>
            <Slider
              style={{ width: 455, height: 10 }}
              minimumValue={0}
              maximumValue={16} // 최대 값 변경
              minimumTrackTintColor="#D9D9D9"
              maximumTrackTintColor="#D9D9D9"
              value={userWind} // Slider의 값 설정
              onValueChange={(value) => setUserWind(value)} // userWind 값 변경
            />
          </WindSliderWrapper>
        </WindSliderContainer>
        <WindPowerImage height={450} />
      </WindSliderView>
    </Wrapper>
  );
};

export default SettingWind;
