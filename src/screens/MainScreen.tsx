import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { Shadow } from 'react-native-shadow-2';
import NotificationIcon from '../assets/images/ic-main-noti-unread.svg';
import SettingIcon from '../assets/images/ic-main-settings.svg';
import RainIcon from '../assets/images/ic_rain.svg';
import RainWithCloudIcon from '../assets/images/ic-weather-rain.svg';
import WaitherIcon from '../assets/images/ic-ask-databox_no_shadow.svg';
import GpsIcon from '../assets/images/ic_gps.svg';
import TemIcon from '../assets/images/ic_tem.svg';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 1;
`;

const MainHeader = styled.View`
  margin-top: 58px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const MainHeaderLeft = styled.View`
  flex: 1;
`;

const MainHeaderCenter = styled.View`
  flex: 1;
  align-items: center;
`;

const MainHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const MainHearderRight = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const MainInfoView = styled.View`
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MainAccentView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  background-color: rgba(81, 137, 246, 1);
  width: 343px;
  height: 92px;
  border-radius: 16px;
`;

const MainAccentIcon = styled.View`
  width: 70px;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  margin-right: 10px;
`;

const MainAccentTextView = styled.View`
  flex-direction: column;
`;

const MainAccentTitle = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 2px;
`;

const MainAccentText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

const MainWeatherView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 343px;
  height: 156px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.15);
`;

const MainWeatherInfoView = styled.View`
  flex-direction: column;
  margin-left: 37px;
`;

const MainWeatherLocationView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainWeatherLocation = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 13px;
  margin-left: 3px;
`;

const MainWeatherTemView = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const MainWeatherTem = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 56px;
  margin-bottom: 10px;
`;

const MainWeatherTemDegree = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 35px;
`;

const MainWeatherMaxMinView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.View`
  height: 13px;
  width: 1px;
  background-color: white;
  margin: 0px 10px;
`;

const MainWeatherMaxMinText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 13px;
`;

const MainWeatherIconView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 85px;
  width: 118px;
`;

const MainScreen = () => {
  return (
    <Wrapper>
      <LinearGradient
        colors={[
          'rgba(179, 166, 155, 1)',
          'rgba(110, 131, 149, 1)',
          'rgba(118, 123, 127, 1)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0416, 0.5188, 0.9765]}
        style={{ flex: 1, width: '100%' }}
      >
        <MainHeader>
          <MainHeaderLeft></MainHeaderLeft>
          <MainHeaderCenter>
            <MainHeaderText>NOW.</MainHeaderText>
          </MainHeaderCenter>
          <MainHearderRight>
            <NotificationIcon height={44} />
            <SettingIcon height={44} />
          </MainHearderRight>
        </MainHeader>
        <MainInfoView>
          <MainAccentView>
            <MainAccentIcon>
              <RainIcon height={43} width={65} />
            </MainAccentIcon>
            <MainAccentTextView>
              <MainAccentTitle>비가 오네요. 우산 챙기세요 !</MainAccentTitle>
              <MainAccentText>15:30에 그칠 예정입니다.</MainAccentText>
            </MainAccentTextView>
          </MainAccentView>
          <MainAccentView>
            <MainAccentIcon>
              <WaitherIcon height={50} width={50} />
            </MainAccentIcon>
            <MainAccentTextView>
              <MainAccentTitle>OO님이 춥다고 답변하셨던 날씨</MainAccentTitle>
              <MainAccentText>오늘은 따뜻하게 입으세요 !</MainAccentText>
            </MainAccentTextView>
          </MainAccentView>
          <MainWeatherView>
            <MainWeatherInfoView>
              <MainWeatherLocationView>
                <GpsIcon height={12} width={12} />
                <MainWeatherLocation>경기도 용인시 기흥구</MainWeatherLocation>
              </MainWeatherLocationView>
              <MainWeatherTemView>
                <MainWeatherTem>5</MainWeatherTem>
                <MainWeatherTemDegree>°C</MainWeatherTemDegree>
              </MainWeatherTemView>
              <MainWeatherMaxMinView>
                <TemIcon height={20} width={13} style={{ marginRight: 5 }} />
                <MainWeatherMaxMinText>최저 0°C</MainWeatherMaxMinText>
                <Divider />
                <MainWeatherMaxMinText>최고 7°C</MainWeatherMaxMinText>
              </MainWeatherMaxMinView>
            </MainWeatherInfoView>
            <MainWeatherIconView>
              <RainWithCloudIcon />
            </MainWeatherIconView>
          </MainWeatherView>
        </MainInfoView>
      </LinearGradient>
    </Wrapper>
  );
};

export default MainScreen;
