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
  margin-top: 20px;
  margin-left: 20px;
`;

const SelectedDayTitle = styled.Text`
  font-size: 18px;
  margin-left: 4px;
`;

const NotificationMainTitle = styled.Text`
  font-size: 18px;
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
  const [Monday, setIsMonday] = useState(false);
  const [Tuesday, setIsTuesday] = useState(false);
  const [Wednesday, setIsWednesday] = useState(false);
  const [Thursday, setIsThursday] = useState(false);
  const [Friday, setIsFriday] = useState(false);
  const [Saturday, setIsSaturday] = useState(false);
  const [Sunday, setIsSunday] = useState(false);

  const name = useRecoilValue(userNameState);

  //   ==========================================================================================

  // ===============================================================
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1%', '100%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsModalPress(true);
  }, []);

  const [isModalPress, setIsModalPress] = useState(false);

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsModalPress(false);
  };

  //===============================================================

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

  //   ==========================================================================================
  const [isOutingToggleEnabled, setIsOutingToggleEnabled] = useState(false);
  const [isOutingEnabled, setIsOutingEnabled] = useState(false);
  const [isWeatherWarningToggleEnabled, setIsWeatherWarningToggleEnabled] =
    useState(false);
  const [isWeatherWarningEnabled, setIsWeatherWarningEnabled] = useState(false);
  const [isUserCustomToggleEnabled, setIsUserCustomToglleEnabled] =
    useState(false);
  const [isUserCustomEnabled, setIsUserCustomEnabled] = useState(false);
  const [isSnowFallToggleEnabled, setIsSnowFallToglleEnabled] = useState(false);
  const [isSnowFallEnabled, setIsSnowFallEnabled] = useState(false);
  const OutingtoggleSwitch = () => {
    setIsOutingToggleEnabled((previousState) => !previousState);
    setIsOutingEnabled(isOutingToggleEnabled);
  };
  const WeatherWarningtoggleSwitch = () => {
    setIsWeatherWarningToggleEnabled((previousState) => !previousState);
    setIsWeatherWarningEnabled(isWeatherWarningToggleEnabled);
  };
  const UserCustomtoggleSwitch = () => {
    setIsUserCustomToglleEnabled((previousState) => !previousState);
    setIsUserCustomEnabled(isUserCustomToggleEnabled);
  };
  const SnowFalltoggleSwitch = () => {
    setIsSnowFallToglleEnabled((previousState) => !previousState);
    setIsSnowFallEnabled(isSnowFallToggleEnabled);
  };

  const SundayClick = () => {
    setIsSunday((previousState) => !previousState);
  };
  const MondayClick = () => {
    setIsMonday((previousState) => !previousState);
  };
  const TuesdayClick = () => {
    setIsTuesday((previousState) => !previousState);
  };
  const WednedayClick = () => {
    setIsWednesday((previousState) => !previousState);
  };
  const ThursdayClick = () => {
    setIsThursday((previousState) => !previousState);
  };
  const FridayClick = () => {
    setIsFriday((previousState) => !previousState);
  };
  const SaturdayClick = () => {
    setIsSaturday((previousState) => !previousState);
  };

  console.log(Sunday);
  console.log(Monday);
  console.log(Tuesday);
  console.log(Wednesday);
  console.log(Thursday);
  console.log(Friday);
  console.log(Saturday);

  useEffect(() => {
    setIsOutingEnabled(isOutingToggleEnabled);
    setIsWeatherWarningEnabled(isWeatherWarningToggleEnabled);
    setIsUserCustomEnabled(isUserCustomToggleEnabled);
    setIsSnowFallEnabled(isSnowFallToggleEnabled);
  }, [
    setIsOutingEnabled,
    isOutingToggleEnabled,
    setIsWeatherWarningEnabled,
    isWeatherWarningEnabled,
    setIsUserCustomEnabled,
    isUserCustomToggleEnabled,
    setIsSnowFallEnabled,
    isSnowFallToggleEnabled,
  ]);
  return (
    <>
      <Wrapper>
        <NotificationDay>
          <SelectedDayWrapper>
            <NotificationMainTitle>매주</NotificationMainTitle>
            <SelectedDayTitle>월</SelectedDayTitle>
            <SelectedDayTitle>수</SelectedDayTitle>
            <SelectedDayTitle>금</SelectedDayTitle>
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
              <SettingMainTitle>오전 9:00</SettingMainTitle>
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
              value={isOutingToggleEnabled}
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
              value={isWeatherWarningToggleEnabled}
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
              value={isUserCustomToggleEnabled}
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
              value={isSnowFallToggleEnabled}
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
              <ModalCompleteBtn onPress={handleDismissModalPress}>
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
