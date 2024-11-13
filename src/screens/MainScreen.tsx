import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import NotificationIcon from '../assets/images/ic-main-noti-unread.svg';
import SettingIcon from '../assets/images/ic-main-settings.svg';
import RainIcon from '../assets/images/ic_rain.svg';
import SunIcon from '../assets/images/ic_sunny.svg';
import RainWithCloudIcon from '../assets/images/ic-weather-rain.svg';
import SunnyIcon from '../assets/images/ic-weather-sunny.svg';
import NightCloudIcon from '../assets/images/ic-weather-night-cloudy.svg';
import NightClearIcon from '../assets/images/ic-weather-night-clear.svg';
import NightRainIcon from '../assets/images/ic-weather-night-rainy.svg';
import NightSnowIcon from '../assets/images/ic-weather-snow.svg';
import AfternoonSnowIcon from '../assets/images/ic-weather-snownabitcloudy.svg';
import SnowIcon from '../assets/images/ic-weather-snow.svg';
import WaitherIcon from '../assets/images/ic-ask-databox_no_shadow.svg';
import GpsIcon from '../assets/images/ic_gps.svg';
import TemIcon from '../assets/images/ic_tem.svg';
import WindIcon from '../assets/images/ic_wind.svg';
import CloudIcon from '../assets/images/ic_cloud.svg';
import FineDustIcon from '../assets/images/ic_finedust.svg';
import ShowerIcon from '../assets/images/ic-shower.svg';
import CloudyIcon from '../assets/images/ic-cloudy.svg';
import RainyCloudyIcon from '../assets/images/ic-weather-rainy.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useSuspenseQuery } from '@tanstack/react-query';
import { currentLocationGet, mainWeatherGet, reportGet } from '../api';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

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

const MainAccentView = styled.TouchableOpacity`
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
  width: 65%;
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
  margin-left: 25px;
`;

const MainWeatherLocationView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SunnyView = styled.View`
  padding-top: 340%;
  padding-right: 10%;
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
  const [isRainy, setIsRainy] = useState(false);
  const [isWhenRainy, setIsWhenRainy] = useState(0);
  const [isWhenRainyStop, setIsWhenRainyStop] = useState(0);
  const time = new Date();
  const currentTime = time.getHours() % 24;

  // const token = AsyncStorage.getItem('accessToken');
  // const accessToken = `Bearer ${token}`;
  //----------------React Query-----------------
  const {
    isPending: isMainDataPending,
    error: mainDataError,
    data: mainData,
    isFetching: isMainDataFetching,
    isLoading: isMainDataLoading,
  } = useSuspenseQuery({
    queryKey: ['mainData'],
    queryFn: mainWeatherGet,
    // staleTime: Infinity,
  });

  const {
    isPending: isLocationDataPending,
    error: locationDataError,
    data: locationData,
    isFetching: isLocationDataFetching,
  } = useSuspenseQuery({
    queryKey: ['currentLocationData'],
    queryFn: currentLocationGet,
    // staleTime: Infinity,
  });

  const {
    isPending: isReportDataPending,
    error: reportDataError,
    data: reportData,
    isFetching: isReportDataFetching,
  } = useSuspenseQuery({
    queryKey: ['reportData'],
    queryFn: reportGet,
    // staleTime: Infinity,
  });

  //---------강수 여부 및 강수 시간 검사 함수------------------------
  const rainyCheck = () => {
    let foundFirstRain = false;
    let foundFirstClear = false;

    for (let i = 0; i < mainData.result.expectedPty.length; i++) {
      if (!foundFirstRain && mainData.result.expectedPty[i] === '1') {
        setIsRainy(true);
        setIsWhenRainy(time.getHours() + i);
        foundFirstRain = true;
      } else if (
        foundFirstRain &&
        !foundFirstClear &&
        mainData.result.expectedPty[i] === '0'
      ) {
        setIsWhenRainyStop(time.getHours() + i);
        foundFirstClear = true;
        break;
      }
    }
  };
  //------------미래 날씨 예측 컴포넌트 데이터, 아이콘 처리 함수--------------------
  const hourlyWeatherIcon = (i, time) => {
    //강수 없음, 구름많음
    if (
      (mainData.result.expectedPty[i] == 0 &&
        mainData.result.expectedSky[i] == 3,
      4)
    ) {
      //해가 떠 있을때
      if (time > 6 && time < 18) {
        return <CloudyIcon width={48} height={45} />;
      }
      //해가 떠 있지 않을때
      else {
        return <NightCloudIcon width={48} height={45} />;
      }
    }

    //강수 없음, 맑음
    if (
      mainData.result.expectedPty[i] == 0 &&
      mainData.result.expectedSky[i] == 1
    ) {
      //해가 떠 있을때
      if (time > 6 && time < 18) {
        return <SunnyIcon width={48} height={45} />;
      }
      //해가 떠 있지 않을때
      else {
        return <NightClearIcon width={48} height={45} />;
      }
    }
    //강수 있음, 맑음
    if (
      mainData.result.expectedPty[i] == 1 &&
      mainData.result.expectedSky[i] == 1
    ) {
      //해가 떠 있을때
      if (time > 6 && time < 18) {
        return <ShowerIcon width={48} height={45} />;
      }
      //해가 떠 있지 않을때
      else {
        return <NightRainIcon width={48} height={45} />;
      }
    }
    //강수 있음, 구름많음
    if (
      mainData.result.expectedPty[i] == 1 &&
      mainData.result.expectedSky[i] == 3
    ) {
      //해가 떠 있을때
      if (time > 6 && time < 18) {
        return <RainyCloudyIcon width={48} height={45} />;
      }
      //해가 떠 있지 않을때
      else {
        return <NightRainIcon width={48} height={45} />;
      }
    }
    //눈 있음
    if (mainData.result.expectedPty[i] == 3) {
      //해가 떠 있을때
      if (time > 6 && time < 18) {
        return <AfternoonSnowIcon width={48} height={45} />;
      }
      //해가 떠 있지 않을때
      else {
        return <NightSnowIcon width={48} height={45} />;
      }
    }
  };

  const hourlyWeatherData = [
    {
      time: ((time.getHours() + 1) % 24) + '시',
      icon: hourlyWeatherIcon(0, (time.getHours() + 1) % 24),
      temperature: mainData.result.expectedTemp[0] + '°C',
    },
    {
      time: ((time.getHours() + 2) % 24) + '시',
      icon: hourlyWeatherIcon(1, (time.getHours() + 2) % 24),
      temperature: mainData.result.expectedTemp[1] + '°C',
    },
    {
      time: ((time.getHours() + 3) % 24) + '시',
      icon: hourlyWeatherIcon(2, (time.getHours() + 3) % 24),
      temperature: mainData.result.expectedTemp[2] + '°C',
    },
    {
      time: ((time.getHours() + 4) % 24) + '시',
      icon: hourlyWeatherIcon(3, (time.getHours() + 4) % 24),
      temperature: mainData.result.expectedTemp[3] + '°C',
    },
    {
      time: ((time.getHours() + 5) % 24) + '시',
      icon: hourlyWeatherIcon(4, (time.getHours() + 5) % 24),
      temperature: mainData.result.expectedTemp[4] + '°C',
    },
    {
      time: ((time.getHours() + 6) % 24) + '시',
      icon: hourlyWeatherIcon(5, (time.getHours() + 6) % 24),
      temperature: mainData.result.expectedTemp[5] + '°C',
    },
  ];
  //------------풍향 각도에 따른 풍향 데이터 처리 함수---------------------------
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
  //----------------시간대에 따른 배경 그레디언트 설정 함수----------------

  const asTimeBackgroundColor = () => {
    const testtime = 22;
    //낮 시간대
    if (currentTime >= 6 && currentTime < 15) {
      return [
        'rgba(143,169,160, 1)',
        'rgba(50,127,188, 1)',
        'rgba(22,115,187, 1)',
      ];
    }
    //노을 시간대
    if (currentTime >= 15 && currentTime < 18) {
      return [
        'rgba(179, 166, 155, 1)',
        'rgba(110, 131, 149, 1)',
        'rgba(118, 123, 127, 1)',
      ];
    }
    //밤 시간대
    else {
      return ['rgba(114,120,167,1)', 'rgba(23,60,90,1)', 'rgba(16,26,34,1)'];
    }
  };

  useEffect(() => {
    setWDirection(getWindDirection(mainData.result.windVector));
    reportGet();
    rainyCheck();
  }, []);

  //----------------------written by yeop----------------------
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

  return (
    <Wrapper>
      <LinearGradient
        colors={asTimeBackgroundColor()}
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
              onPress={() => navigation.navigate('Notifications')}
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
          <MainAccentView onPress={() => navigation.navigate('Report')}>
            <MainAccentIcon>
              {isRainy ? <RainIcon height={43} width={65} /> : <SunIcon />}
            </MainAccentIcon>
            <MainAccentTextView>
              {/* main API 예상 강수량 이용*/}
              <MainAccentTitle>
                {isRainy == true
                  ? '비가 오네요. 우산 챙기세요 !'
                  : '오늘은 비가 오지 않을 예정입니다!'}
              </MainAccentTitle>
              <MainAccentText>
                {isRainy == true
                  ? `${isWhenRainy}시부터 비가 내려${`\n`}${isWhenRainyStop}시에 멈출 예정입니다!`
                  : '대체적으로 맑을 예정입니다!'}
              </MainAccentText>
            </MainAccentTextView>
          </MainAccentView>
          <MainAccentView onPress={() => navigation.navigate('Report')}>
            <MainAccentIcon>
              <WaitherIcon height={50} width={50} />
            </MainAccentIcon>
            <MainAccentTextView>
              <MainAccentTitle>
                오늘은 {name}님에게 {reportData.result.advices[0]}
              </MainAccentTitle>
              {/* 레포트 처음으로 오는 advice */}
              <MainAccentText>
                {reportData.result.advices.length == 1
                  ? '오늘의 날씨는 무난합니다!'
                  : `${reportData.result.advices[1]}`}
              </MainAccentText>
            </MainAccentTextView>
          </MainAccentView>
          <MainWeatherView>
            <MainWeatherInfoView>
              <MainWeatherLocationView>
                <GpsIcon height={12} width={12} />
                <MainWeatherLocation>
                  {locationData.documents[0].road_address.region_1depth_name +
                    ' ' +
                    locationData.documents[0].road_address.region_2depth_name}
                </MainWeatherLocation>
              </MainWeatherLocationView>
              <MainWeatherTemView>
                {/*  */}
                <MainWeatherTem>{mainData.result.temp}</MainWeatherTem>
                <MainWeatherTemDegree>°C</MainWeatherTemDegree>
              </MainWeatherTemView>
              <MainWeatherMaxMinView>
                <TemIcon height={20} width={13} style={{ marginRight: 5 }} />
                <MainWeatherMaxMinText>
                  {/*  */}
                  최저 {mainData.result.tempMin}°C
                </MainWeatherMaxMinText>
                <Divider />
                <MainWeatherMaxMinText>
                  {/*  */}
                  최고 {mainData.result.tempMax}°C
                </MainWeatherMaxMinText>
              </MainWeatherMaxMinView>
            </MainWeatherInfoView>
            <MainWeatherIconView>
              {/* 날씨가 맑으며 18시가 지났으면 night 버전 && pop이 50 이상이면 rainy */}
              {time.getHours() % 24 > 18 ? (
                mainData.result.pop >= 50 ? (
                  <NightRainIcon />
                ) : (
                  <NightClearIcon />
                )
              ) : mainData.result.pop < 50 ? (
                <SunnyIcon />
              ) : (
                <RainWithCloudIcon />
              )}
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
                      {mainData.result.windDegree}m/s
                    </MainExtraWeatherInfoText>
                  </MainExtraWeatherInfoView>
                </MainExtraWeatherViewColumn>
              )}
              {showPrecipitation && (
                <MainExtraWeatherViewColumn>
                  <MainExtraWeatherTitleView>
                    <MainExtraWeatherTitle>강수확률</MainExtraWeatherTitle>
                  </MainExtraWeatherTitleView>
                  <CloudIcon />
                  <MainExtraWeatherInfoView>
                    <MainExtraWeatherInfoText>
                      {/* 1이면은 비 0이면은 맑음 */}
                      {mainData.result.pop + '%'}
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
