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
import WindIcon from '../assets/images/ic_wind.svg';
import CloudIcon from '../assets/images/ic_cloud.svg';
import FineDustIcon from '../assets/images/ic_finedust.svg';
import ShowerIcon from '../assets/images/ic-weather-rain-sunny.svg';
import CloudyIcon from '../assets/images/ic-weather-cloudy.svg';

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
  overflow: visible;
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
  margin-bottom: 12px;
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

const MainExtraWeatherTextDivider = styled.View`
  height: 13px;
  width: 1px;
  background-color: white;
  margin: 0px 5px;
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

const MainExtraWeatherView = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 343px;
  height: 127px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.15);
`;

const MainExtraWeatherViewColumn = styled.View`
  width: 30%;
  align-items: center;
`;

const MainExtraWeatherTitleView = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 20px;
  border-radius: 99px;
  margin-bottom: 18px;
`;

const MainExtraWeatherTitle = styled.Text`
  color: white;
  font-size: 12px;
`;

const MainExtraWeatherInfoView = styled.View`
  flex-direction: row;
  margin-top: 13px;
  align-items: center;
`;

const MainExtraWeatherInfoText = styled.Text`
  color: white;
  font-size: 12px;
`;

const MainWeatherByHourScrollView = styled.ScrollView`
  width: 343px;
  height: 127px;
  overflow: visible;
`;

const MainWeatherByHourView = styled.View`
  width: 643px;
  height: 127px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  flex-direction: row;
`;

const MainWeatherByHourColumn = styled.View`
  flex-direction: column;
`;

const MainWeatherByHourTitle = styled.Text``;

const MainWeatherByHourTemperature = styled.Text``;

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
          <MainExtraWeatherView>
            <MainExtraWeatherViewColumn>
              <MainExtraWeatherTitleView>
                <MainExtraWeatherTitle>풍향/풍속</MainExtraWeatherTitle>
              </MainExtraWeatherTitleView>
              <WindIcon />
              <MainExtraWeatherInfoView>
                <MainExtraWeatherInfoText>남동</MainExtraWeatherInfoText>
                <MainExtraWeatherTextDivider />
                <MainExtraWeatherInfoText>2m/s~4m/s</MainExtraWeatherInfoText>
              </MainExtraWeatherInfoView>
            </MainExtraWeatherViewColumn>
            <MainExtraWeatherViewColumn>
              <MainExtraWeatherTitleView>
                <MainExtraWeatherTitle>강수량</MainExtraWeatherTitle>
              </MainExtraWeatherTitleView>
              <CloudIcon />
              <MainExtraWeatherInfoView>
                <MainExtraWeatherInfoText>1~3mm</MainExtraWeatherInfoText>
              </MainExtraWeatherInfoView>
            </MainExtraWeatherViewColumn>
            <MainExtraWeatherViewColumn>
              <MainExtraWeatherTitleView>
                <MainExtraWeatherTitle>풍향/풍속</MainExtraWeatherTitle>
              </MainExtraWeatherTitleView>
              <FineDustIcon />
              <MainExtraWeatherInfoView>
                <MainExtraWeatherInfoText>좋음</MainExtraWeatherInfoText>
                <MainExtraWeatherTextDivider />
                <MainExtraWeatherInfoText>20㎍/m³</MainExtraWeatherInfoText>
              </MainExtraWeatherInfoView>
            </MainExtraWeatherViewColumn>
          </MainExtraWeatherView>
          <MainWeatherByHourScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <MainWeatherByHourView>
              <MainWeatherByHourColumn>
                <MainWeatherByHourTitle>16시</MainWeatherByHourTitle>
                <ShowerIcon width={42} height={38} />
                <MainWeatherByHourTemperature>5°C</MainWeatherByHourTemperature>
              </MainWeatherByHourColumn>
            </MainWeatherByHourView>
          </MainWeatherByHourScrollView>
        </MainInfoView>
      </LinearGradient>
    </Wrapper>
  );
};

export default MainScreen;
