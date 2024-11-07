import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
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
import ShowerIcon from '../assets/images/ic-shower.svg';
import CloudyIcon from '../assets/images/ic-cloudy.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { mainWeatherGet } from '../api';

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
  width: 33%;
`;

const MainHeaderCenter = styled.View`
  width: 33%;
  align-items: center;
`;

const MainHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const MainHearderRight = styled.View`
  width: 33%;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 17px;
`;

const MainHeaderRightIconView = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
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
  width: 105%;
  height: 127px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  flex-direction: row;
  padding-left: 13px;
`;

const MainWeatherByHourColumn = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
`;

const MainWeatherByHourTitle = styled.Text`
  color: white;
  font-size: 15px;
  margin-bottom: 10px;
`;

const MainWeatherByHourTemperature = styled.Text`
  color: white;
  font-size: 15px;
  margin-bottom: 12px;
  margin-top: 7px;
`;

type Props = {
  navigation: NavigationProp<any>;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const [showWind, setShowWind] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [wDirection, setWDirection] = useState('');
  const [name, setName] = useRecoilState(userNameState);
  const time = new Date();
  //-------------------------------------------------
  const { isPending, error, data, isFetching, isLoading } = useSuspenseQuery({
    queryKey: ['mainData'],
    queryFn: mainWeatherGet,
    staleTime: Infinity,
  });

  console.log('data:', data);
  console.log('error:', error);
  console.log('isFetching:', isFetching);
  console.log('isPending:', isPending);
  console.log('isLoading', isLoading);
  console.log(data.tempMin);
  console.log(time.getHours());

  //-------------------------------------------------
  const hourlyWeatherData = [
    {
      time: ((time.getHours() + 1) % 24) + '시',
      icon: <ShowerIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[0] + '°C',
    },
    {
      time: ((time.getHours() + 2) % 24) + '시',
      icon: <CloudyIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[1] + '°C',
    },
    {
      time: ((time.getHours() + 3) % 24) + '시',
      icon: <CloudyIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[2] + '°C',
    },
    {
      time: ((time.getHours() + 4) % 24) + '시',
      icon: <CloudyIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[3] + '°C',
    },
    {
      time: ((time.getHours() + 5) % 24) + '시',
      icon: <CloudyIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[4] + '°C',
    },
    {
      time: ((time.getHours() + 6) % 24) + '시',
      icon: <CloudyIcon width={48} height={45} />,
      temperature: data.result.expectedTemp[5] + '°C',
    },
  ];

  function getWindDirection(degrees) {
    if (
      (degrees >= 0 && degrees < 22.5) ||
      (degrees >= 337.5 && degrees <= 360)
    ) {
      return '북'; // North
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return '북동'; // Northeast
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return '동'; // East
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return '남동'; // Southeast
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return '남'; // South
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return '남서'; // Southwest
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return '서'; // West
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return '북서'; // Northwest
    } else {
      return '잘못된 각도'; // Invalid angle
    }
  }

  useEffect(() => {
    setWDirection(getWindDirection(data.result.windVector));
  }, []);

  const fetchUserSettings = async () => {
    const token = await AsyncStorage.getItem('accessToken'); // 토큰 가져오기

    try {
      const response = await fetch(
        'https://waither.shop/user/setting/display',
        {
          method: 'GET',
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      if (result.code === '200') {
        const { wind, precipitation, dust } = result.result;
        setShowWind(wind);
        setShowPrecipitation(precipitation);
        setShowDust(dust);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }

    try {
      const response = await fetch('https://waither.shop/user/setting/mypage', {
        method: 'GET',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.code === '200') {
        setName(result.result.nickname);
      }
    } catch (error) {
      console.error('Error fetching userName: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserSettings(); // 화면이 포커스를 받을 때마다 설정값을 새로 가져옴
    }, []),
  );
  //=================================================================
  // const mainWeatherGet = async () => {
  //   const url =
  //     'https://waither.shop/weather/main?latitude=37.5984434503798&longitude=126.946053090715';
  //   const token = await AsyncStorage.getItem('accessToken');
  //   const accessToken = 'Bearer ' + token;
  //   const headers = {
  //     Authorization: accessToken,
  //     'Content-Type': 'application/json',
  //   };

  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: headers,
  //     });
  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error('Network response was not ok');
  //     }
  //     const res = await response.json();
  //     console.log('메인화면 호출 결과', res);
  //   } catch (error) {
  //     console.error('메인화면 호출 결과', error);
  //   }
  // };

  // useEffect(() => {
  //   mainWeatherGet();
  // }, []);

  //---------------------------------------------------

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
            <MainHeaderRightIconView
              onPress={() => navigation.navigate('Report')}
            >
              <NotificationIcon height={44} />
            </MainHeaderRightIconView>
            <MainHeaderRightIconView
              onPress={() => navigation.navigate('Settings')}
            >
              <SettingIcon height={44} />
            </MainHeaderRightIconView>
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
              <MainAccentTitle>
                {name}님이 춥다고 답변하셨던 날씨
              </MainAccentTitle>
              <MainAccentText>{}</MainAccentText>
            </MainAccentTextView>
          </MainAccentView>
          <MainWeatherView>
            <MainWeatherInfoView>
              <MainWeatherLocationView>
                <GpsIcon height={12} width={12} />
                <MainWeatherLocation>경기도 용인시 기흥구</MainWeatherLocation>
              </MainWeatherLocationView>
              <MainWeatherTemView>
                {/*  */}
                <MainWeatherTem>{data.result.temp}</MainWeatherTem>
                <MainWeatherTemDegree>°C</MainWeatherTemDegree>
              </MainWeatherTemView>
              <MainWeatherMaxMinView>
                <TemIcon height={20} width={13} style={{ marginRight: 5 }} />
                <MainWeatherMaxMinText>
                  {/*  */}
                  최저 {data.result.tempMin}°C
                </MainWeatherMaxMinText>
                <Divider />
                <MainWeatherMaxMinText>
                  {/*  */}
                  최고 {data.result.tempMax}°C
                </MainWeatherMaxMinText>
              </MainWeatherMaxMinView>
            </MainWeatherInfoView>
            <MainWeatherIconView>
              <RainWithCloudIcon />
            </MainWeatherIconView>
          </MainWeatherView>
          {/* 조건부 렌더링: 세 가지 설정이 모두 false일 때 MainExtraWeatherView를 숨깁니다. */}
          {(showWind || showPrecipitation || showDust) && (
            <MainExtraWeatherView>
              {showWind && (
                <MainExtraWeatherViewColumn>
                  <MainExtraWeatherTitleView>
                    <MainExtraWeatherTitle>풍향/풍속</MainExtraWeatherTitle>
                  </MainExtraWeatherTitleView>
                  <WindIcon />
                  <MainExtraWeatherInfoView>
                    <MainExtraWeatherInfoText>
                      {wDirection}
                    </MainExtraWeatherInfoText>
                    <MainExtraWeatherTextDivider />
                    <MainExtraWeatherInfoText>
                      {data.result.windDegree}m/s
                    </MainExtraWeatherInfoText>
                  </MainExtraWeatherInfoView>
                </MainExtraWeatherViewColumn>
              )}
              {showPrecipitation && (
                <MainExtraWeatherViewColumn>
                  <MainExtraWeatherTitleView>
                    <MainExtraWeatherTitle>강수량</MainExtraWeatherTitle>
                  </MainExtraWeatherTitleView>
                  <CloudIcon />
                  <MainExtraWeatherInfoView>
                    <MainExtraWeatherInfoText>
                      {data.result.expectedRain[0]}
                    </MainExtraWeatherInfoText>
                  </MainExtraWeatherInfoView>
                </MainExtraWeatherViewColumn>
              )}
              {showDust && (
                <MainExtraWeatherViewColumn>
                  <MainExtraWeatherTitleView>
                    <MainExtraWeatherTitle>미세먼지</MainExtraWeatherTitle>
                  </MainExtraWeatherTitleView>
                  <FineDustIcon />
                  <MainExtraWeatherInfoView>
                    <MainExtraWeatherInfoText>좋음</MainExtraWeatherInfoText>
                    <MainExtraWeatherTextDivider />
                    <MainExtraWeatherInfoText>20㎍/m³</MainExtraWeatherInfoText>
                  </MainExtraWeatherInfoView>
                </MainExtraWeatherViewColumn>
              )}
            </MainExtraWeatherView>
          )}
          <MainWeatherByHourScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <MainWeatherByHourView>
              {hourlyWeatherData.map((data, index) => (
                <MainWeatherByHourColumn key={index}>
                  <MainWeatherByHourTitle>{data.time}</MainWeatherByHourTitle>
                  {data.icon}
                  <MainWeatherByHourTemperature>
                    {data.temperature}
                  </MainWeatherByHourTemperature>
                </MainWeatherByHourColumn>
              ))}
            </MainWeatherByHourView>
          </MainWeatherByHourScrollView>
        </MainInfoView>
      </LinearGradient>
    </Wrapper>
  );
};

export default MainScreen;
