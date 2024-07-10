import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import { useNavigation } from '@react-navigation/native';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userNameState,
  userNotificationTimeState,
} from '../recoil/userInitInfoRecoil';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { USER_WIDTH } from '../styles/dimension';
import { Picker } from '@react-native-picker/picker';
import authTokens from '../utils/authTokens';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: '#E0E1E4';
  flex: 1;
`;
const NotificationDay = styled.View`
  background-color: white;
  width: 100%;
  height: 90px;
`;

const SelectedDayWrapper = styled.View`
  display: flex;
  flex-direction: row;
  height: 25px;
  margin-top: 20px;
  margin-left: 20px;
  align-items: center;
`;

const SelectedDayTitle = styled.Text`
  position: relative;
  font-size: 18px;
  margin-left: 4px;
  /* margin-bottom: 1px; */
`;

const NotificationMainTitle = styled.Text`
  font-size: 18px;
  margin-right: 5px;
`;

const NotificationSubTitle = styled.Text`
  margin-top: 15px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.4);
`;

const DayWrappaer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  background-color: white;
`;

const Days = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  width: 95%;
  align-items: center;
  justify-content: space-around;
`;
const Day = styled.TouchableOpacity`
  border: 1.5px solid ${MAIN_COLOR};
  border-radius: 100px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const DayTitle = styled.Text`
  color: ${MAIN_COLOR};
`;

const TimeSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: white;
`;

const TimeSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const TimeSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 130px;
`;

const SettingMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const SettingSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;
const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const ToggleWrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* background-color: red; */
  height: 350px;
`;

const MainScreenSettingView = styled.View`
  flex: 0.3;
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

const MainScreenTitleView = styled.View`
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

const WindSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: white;
  margin-top: 20px;
`;

const WindSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const WindSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 95px;
`;

const PickerWrapper = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ModalBtnView = styled.View`
  margin-top: 5px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const ModalCancleBtn = styled.TouchableOpacity``;

const ModalText = styled.Text`
  color: ${MAIN_COLOR};
`;
const ModalCompleteBtn = styled.TouchableOpacity``;

const SettingNotification = () => {
  const navigation = useNavigation();
  const name = useRecoilValue(userNameState);
  //======================================================
  const [Monday, setIsMonday] = useState(false);
  const [Tuesday, setIsTuesday] = useState(false);
  const [Wednesday, setIsWednesday] = useState(false);
  const [Thursday, setIsThursday] = useState(false);
  const [Friday, setIsFriday] = useState(false);
  const [Saturday, setIsSaturday] = useState(false);
  const [Sunday, setIsSunday] = useState(false);

  const [chosenDay, setChosenDay] = useState([]);
  const [outTime, setOutTime] = useState('');

  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('1');
  const [selectedMinute, setSelectedMinute] = useState('1');

  const [notificationTime, setNotificationTime] = useRecoilState(
    userNotificationTimeState,
  );

  const AmPmOptions = [
    { label: '오전', value: 'AM' },
    { label: '오후', value: 'PM' },
  ];

  const hourOptions = Array.from({ length: 12 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  const minuteOptions = Array.from({ length: 59 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  useEffect(() => {
    let notificationHour;
    if (selectedAmPm === 'AM') {
      notificationHour = selectedHour === '12' ? '00' : selectedHour;
    } else {
      notificationHour =
        selectedHour === '12' ? '12' : String(12 + Number(selectedHour));
    }

    const formattedHour = String(notificationHour).padStart(2, '0');
    const formattedMinute = String(selectedMinute).padStart(2, '0');

    const notificationTime = formattedHour + formattedMinute;
    setNotificationTime(notificationTime);
  }, [selectedAmPm, selectedHour, selectedMinute, setNotificationTime]);

  const SundayClick = () => {
    setIsSunday((previousState) => !previousState);
    checkDay('일');
  };
  const MondayClick = () => {
    setIsMonday((previousState) => !previousState);
    checkDay('월');
  };
  const TuesdayClick = () => {
    setIsTuesday((previousState) => !previousState);
    checkDay('화');
  };
  const WednedayClick = () => {
    setIsWednesday((previousState) => !previousState);
    checkDay('수');
  };
  const ThursdayClick = () => {
    setIsThursday((previousState) => !previousState);
    checkDay('목');
  };
  const FridayClick = () => {
    setIsFriday((previousState) => !previousState);
    checkDay('금');
  };
  const SaturdayClick = () => {
    setIsSaturday((previousState) => !previousState);
    checkDay('토');
  };

  const dayMapping = {
    월: 'Monday',
    화: 'Tuesday',
    수: 'Wednesday',
    목: 'Thursday',
    금: 'Friday',
    토: 'Saturday',
    일: 'Sunday',
  };

  //배열에 중복되는 요일이 있는지 확인하는 함수
  const checkDay = (day) => {
    setChosenDay((chosenDay) =>
      //chosenDay가 이미 배열에 있는지 확인
      chosenDay.includes(day)
        ? //포함되어 있다면 day를 제거
          chosenDay.filter((d) => d !== day)
        : //포함되어 있지 않다면 기존의 배열에 day를 추가 후 새로운 배열 생성
          [...chosenDay, day],
    );
  };

  //chosenDay의 배열을 월,화,수 ... 순으로 정렬
  const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
  const sortedChosenDays = [...chosenDay].sort(
    //프디강의 : 오름차순 정렬 무명함수
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b),
  );

  const chosenEnglishDays = sortedChosenDays.map((day) => dayMapping[day]);

  //===============================================================

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1%', '100%'], []);
  const [isModalPress, setIsModalPress] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsModalPress(true);
  }, []);

  const [timeSelected, setTimeSelected] = useState(false);

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsModalPress(false);
    setTimeSelected(false);
  };

  const handleCompleteModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsModalPress(false);
    setTimeSelected(true);
  };

  useEffect(() => {
    if (timeSelected) {
      notificationTimeZonePut();
    }
  }, [handleCompleteModalPress]);

  useEffect(() => {
    if (selectedAmPm == 'PM' && timeSelected) {
      setOutTime(
        `${parseInt(selectedHour) + 12}:${selectedMinute.padStart(2, '0')}:00`,
      );
    }
    if (selectedAmPm == 'AM' && timeSelected) {
      setOutTime(
        `${selectedHour.padStart(2, '0')}:${selectedMinute.padStart(2, '0')}:00`,
      );
    }
  }, [isModalPress]);

  //==========================================================================================
  const [isLoading, setIsLoading] = useState(false);

  const [isOutingEnabled, setIsOutingEnabled] = useState(false);
  const [isWeatherWarningEnabled, setIsWeatherWarningEnabled] = useState(false);
  const [isUserCustomEnabled, setIsUserCustomEnabled] = useState(false);
  const [isSnowFallEnabled, setIsSnowFallEnabled] = useState(false);

  const OutingtoggleSwitch = () => {
    setIsOutingEnabled((previousState) => !previousState);
  };
  const WeatherWarningtoggleSwitch = () => {
    setIsWeatherWarningEnabled((previousState) => !previousState);
  };
  const UserCustomtoggleSwitch = () => {
    setIsUserCustomEnabled((previousState) => !previousState);
  };
  const SnowFalltoggleSwitch = () => {
    setIsSnowFallEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    if (isLoading) {
      outAlertPut();
    }
  }, [isOutingEnabled]);

  useEffect(() => {
    if (isLoading) {
      climateAlertPut();
    }
  }, [isWeatherWarningEnabled]);

  useEffect(() => {
    if (isLoading) {
      userAlertPut();
    }
  }, [isUserCustomEnabled]);

  useEffect(() => {
    if (isLoading) {
      snowAlertPut();
    }
  }, [isSnowFallEnabled]);

  //===============================================================

  //외출 요일 및 외출 시간대 호출
  const notificationTimeZonePut = async () => {
    const url = 'https://waither.shop/user/setting/noti/out-alert-set';

    const headers = {
      Authorization: authTokens.accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      days: chosenEnglishDays,
      outTime: outTime,
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
      console.log('외출 요일 및 외출 시간대', res);
    } catch (error) {
      console.error('외출 요일 및 외출 시간대', error);
    }
  };

  //외출 시간 알림 여부 호출
  const outAlertPut = async () => {
    const url = 'https://waither.shop/user/setting/noti/out-alert';

    const headers = {
      Authorization: authTokens.accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      outAlert: isOutingEnabled,
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
      console.log('외출 시간 알림 여부', res);
    } catch (error) {
      console.error('외출 시간 알림 여부', error);
    }
  };

  //기상 특보 알림 여부 호출
  const climateAlertPut = async () => {
    const url = 'https://waither.shop/user/setting/noti/climate-alert';

    const headers = {
      Authorization: authTokens.accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      climateAlert: isWeatherWarningEnabled,
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
      console.log('기상 특보 알림 여부', res);
    } catch (error) {
      console.error('기상 특보 알림 여부', error);
    }
  };

  //사용자 맞춤 예보 여부 호출
  const userAlertPut = async () => {
    const url = 'https://waither.shop/user/setting/noti/user-alert';

    const headers = {
      Authorization: authTokens.accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      userAlert: isUserCustomEnabled,
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
      console.log('사용자 맞춤 예보 여부', res);
    } catch (error) {
      console.error('사용자 맞춤 예보 여부', error);
    }
  };

  //강설 정보 여부 호출
  const snowAlertPut = async () => {
    const url = 'https://waither.shop/user/setting/noti/snow-alert';

    const headers = {
      Authorization: authTokens.accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      snowAlert: isSnowFallEnabled,
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
      console.log('강설 정보 여부', res);
    } catch (error) {
      console.error('강설 정보 여부', error);
    }
  };

  //알림 설정 정보 호출
  const userNotiSettingsGet = async () => {
    const url = 'https://waither.shop/user/setting/noti';

    const headers = {
      Authorization: authTokens.accessToken,
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

      setIsOutingEnabled(res.result.outAlert);
      setIsWeatherWarningEnabled(res.result.climateAlert);
      setIsUserCustomEnabled(res.result.userAlert);
      setIsSnowFallEnabled(res.result.snowAlert);
      setOutTime(res.result.outTime);

      setIsLoading(true);

      //===========================================
      //res로 온 날짜를 전부 검사하여 true로 만들기
      const dayMapping = {
        MONDAY: () => setIsMonday(true),
        TUESDAY: () => setIsTuesday(true),
        WEDNESDAY: () => setIsWednesday(true),
        THURSDAY: () => setIsThursday(true),
        FRIDAY: () => setIsFriday(true),
        SATURDAY: () => setIsSaturday(true),
        SUNDAY: () => setIsSunday(true),
      };

      const dayKoreanMapping = {
        MONDAY: '월',
        TUESDAY: '화',
        WEDNESDAY: '수',
        THURSDAY: '목',
        FRIDAY: '금',
        SATURDAY: '토',
        SUNDAY: '일',
      };

      res.result.days.forEach((day) => {
        if (dayMapping[day]) {
          dayMapping[day]();
        }
      });

      const chosenDays = res.result.days
        .filter((day) => dayKoreanMapping.hasOwnProperty(day))
        .map((day) => dayKoreanMapping[day]);
      setChosenDay(chosenDays);

      //========================================

      console.log('알림 설정 정보', res);
    } catch (error) {
      console.error('알림 설정 정보', error);
    }
  };

  //===============================================================
  useEffect(() => {
    userNotiSettingsGet();
  }, []);
  //===============================================================

  return (
    <>
      <Wrapper>
        <NotificationDay>
          <SelectedDayWrapper>
            <NotificationMainTitle>매주</NotificationMainTitle>
            {sortedChosenDays.length === 0 ? (
              <SelectedDayTitle>선택된 요일 없음</SelectedDayTitle>
            ) : (
              sortedChosenDays.map((date, index) => (
                <SelectedDayTitle key={date}>
                  {index === sortedChosenDays.length - 1 ? date : `${date},`}
                </SelectedDayTitle>
              ))
            )}
          </SelectedDayWrapper>
          <NotificationSubTitle>
            선택된 요일에만 알림을 보내드릴게요.
          </NotificationSubTitle>
        </NotificationDay>
        <DayWrappaer>
          <Days>
            <Day
              onPress={SundayClick}
              style={{ backgroundColor: Sunday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Sunday ? 'white' : `${MAIN_COLOR}` }}>
                일
              </DayTitle>
            </Day>
            <Day
              onPress={MondayClick}
              style={{ backgroundColor: Monday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Monday ? 'white' : `${MAIN_COLOR}` }}>
                월
              </DayTitle>
            </Day>
            <Day
              onPress={TuesdayClick}
              style={{ backgroundColor: Tuesday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Tuesday ? 'white' : `${MAIN_COLOR}` }}>
                화
              </DayTitle>
            </Day>
            <Day
              onPress={WednedayClick}
              style={{ backgroundColor: Wednesday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle
                style={{ color: Wednesday ? 'white' : `${MAIN_COLOR}` }}
              >
                수
              </DayTitle>
            </Day>
            <Day
              onPress={ThursdayClick}
              style={{ backgroundColor: Thursday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Thursday ? 'white' : `${MAIN_COLOR}` }}>
                목
              </DayTitle>
            </Day>
            <Day
              onPress={FridayClick}
              style={{ backgroundColor: Friday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Friday ? 'white' : `${MAIN_COLOR}` }}>
                금
              </DayTitle>
            </Day>
            <Day
              onPress={SaturdayClick}
              style={{ backgroundColor: Saturday ? `${MAIN_COLOR}` : 'white' }}
            >
              <DayTitle style={{ color: Saturday ? 'white' : `${MAIN_COLOR}` }}>
                토
              </DayTitle>
            </Day>
          </Days>
        </DayWrappaer>

        <TimeSettingView>
          <TimeSettingBtn onPress={handlePresentModalPress}>
            <TimeSettingInnerView>
              <SettingMainTitle>
                {parseInt(outTime.slice(0, 3)) >= 13 ? '오후' : '오전'}{' '}
                {outTime.slice(0, -3)}
              </SettingMainTitle>
              <SettingSubTitle>
                설정하신 시간대에 알림을 보내드릴게요.
              </SettingSubTitle>
            </TimeSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </TimeSettingBtn>
        </TimeSettingView>

        <ToggleWrapper>
          <MainScreenSettingView>
            <MainScreenTitleView>
              <CustomServiceMainTitle>
                외출 시간 알림 받기
              </CustomServiceMainTitle>
              <CustomServiceSubTitle>
                외출 전 기상 정보를 받을 수 있어요.
              </CustomServiceSubTitle>
            </MainScreenTitleView>
            <ToggleSwitch
              value={isOutingEnabled}
              onValueChange={OutingtoggleSwitch}
              //toggle 활성화 여부에 따른 색상 설정
              trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
            ></ToggleSwitch>
          </MainScreenSettingView>
          <MainScreenSettingView>
            <MainScreenTitleView>
              <CustomServiceMainTitle>
                기상 특보 알림 받기
              </CustomServiceMainTitle>
              <CustomServiceSubTitle>
                기상 특보 알림을 받을 수 있어요.
              </CustomServiceSubTitle>
            </MainScreenTitleView>
            <ToggleSwitch
              value={isWeatherWarningEnabled}
              onValueChange={WeatherWarningtoggleSwitch}
              //toggle 활성화 여부에 따른 색상 설정
              trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
            ></ToggleSwitch>
          </MainScreenSettingView>
          <MainScreenSettingView>
            <MainScreenTitleView>
              <CustomServiceMainTitle>
                사용자 맞춤 예보 받기
              </CustomServiceMainTitle>
              <CustomServiceSubTitle>
                {name}님의 데이터를 분석한 기상 예보를 받을 수 있어요.
              </CustomServiceSubTitle>
            </MainScreenTitleView>
            <ToggleSwitch
              value={isUserCustomEnabled}
              onValueChange={UserCustomtoggleSwitch}
              //toggle 활성화 여부에 따른 색상 설정
              trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
            ></ToggleSwitch>
          </MainScreenSettingView>
          <MainScreenSettingView>
            <MainScreenTitleView>
              <CustomServiceMainTitle>강설 정보 받기</CustomServiceMainTitle>
              <CustomServiceSubTitle>
                강설 정보를 받을 수 있어요.
              </CustomServiceSubTitle>
            </MainScreenTitleView>
            <ToggleSwitch
              value={isSnowFallEnabled}
              onValueChange={SnowFalltoggleSwitch}
              //toggle 활성화 여부에 따른 색상 설정
              trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
            ></ToggleSwitch>
          </MainScreenSettingView>
        </ToggleWrapper>
        <WindSettingView>
          <WindSettingBtn onPress={() => navigation.navigate('SettingWind')}>
            <WindSettingInnerView>
              <SettingMainTitle>바람 세기 알림</SettingMainTitle>
              <SettingSubTitle>
                특정 바람 세기에 대한 예보를 받아볼 수 있어요.
              </SettingSubTitle>
            </WindSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </WindSettingBtn>
        </WindSettingView>
      </Wrapper>
      <GestureHandlerRootView
        style={{
          zIndex: isModalPress ? 0 : -1,
          flex: 0.6,
          width: USER_WIDTH,
        }}
      >
        <BottomSheetModalProvider>
          <BottomSheetModal
            style={{ flex: 1 }}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <ModalBtnView>
              <ModalCancleBtn
                onPress={handleDismissModalPress}
                style={{ marginRight: 250 }}
              >
                <ModalText>취소</ModalText>
              </ModalCancleBtn>
              <ModalCompleteBtn onPress={handleCompleteModalPress}>
                <ModalText>완료</ModalText>
              </ModalCompleteBtn>
            </ModalBtnView>
            <PickerWrapper>
              <Picker
                style={{ width: 100 }}
                selectionColor={'rgba(81, 137, 246, 0.2)'}
                selectedValue={selectedAmPm}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAmPm(itemValue)
                }
              >
                {AmPmOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    style={{ backgroundColor: 'tomato' }}
                  />
                ))}
              </Picker>
              <Picker
                style={{ width: 100 }}
                //   itemStyle={{ width: 100, height: 150 }}
                selectionColor={'rgba(81, 137, 246, 0.2)'}
                selectedValue={selectedHour}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedHour(itemValue)
                }
              >
                {hourOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    style={{ backgroundColor: 'tomato' }}
                  />
                ))}
              </Picker>
              <Picker
                style={{ width: 100 }}
                //   itemStyle={{ width: 100, height: 150 }}
                selectionColor={'rgba(81, 137, 246, 0.2)'}
                selectedValue={selectedMinute}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMinute(itemValue)
                }
              >
                {minuteOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    style={{ backgroundColor: 'tomato' }}
                  />
                ))}
              </Picker>
            </PickerWrapper>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default SettingNotification;
