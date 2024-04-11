import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: '#E0E1E4';
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.15;
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

const SettingMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const SettingSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingsView = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  background-color: white;
`;

const CompanySettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 25px;
`;

const CompanySettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CompanySettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const NotificationSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 40px;
`;

const NotificationSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const NotificationSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 92px;
`;

const MainScreenSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 40px;
`;

const MainScreenSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const MainScreenSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 47px;
`;

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const PrivacySettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 0.17;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const PrivacySettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const PrivacySettingInnerView = styled.View`
  width: 80%;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 7px;
  flex-direction: column;
`;

const Settings = () => {
  const navigation = useNavigation();
  const [isCustomServiceToggleEnabled, setIsCustomServiceToggleEnabled] =
    useState(false);
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsCustomServiceToggleEnabled((previousState) => !previousState);
    setIsCustomServiceEnabled(isCustomServiceToggleEnabled);
  };

  useEffect(() => {
    setIsCustomServiceEnabled(isCustomServiceToggleEnabled);
  }, [setIsCustomServiceEnabled, isCustomServiceToggleEnabled]);

  return (
    <Wrapper>
      <UserCustomSettingView>
        <CustomServiceTitleView>
          <CustomServiceMainTitle>
            사용자 맞춤 서비스 제공
          </CustomServiceMainTitle>
          <CustomServiceSubTitle>
            사용자 데이터에 맞춰 정확한 데이터를 제공합니다.
          </CustomServiceSubTitle>
        </CustomServiceTitleView>
        <ToggleSwitch
          value={isCustomServiceToggleEnabled}
          onValueChange={toggleSwitch}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>
      <SettingsView>
        <CompanySettingView>
          <CompanySettingBtn
            onPress={() => navigation.navigate('CompanySetting')}
          >
            <CompanySettingInnerView>
              <SettingMainTitle>직장 지역 설정</SettingMainTitle>
              <SettingSubTitle>
                직장 지역을 설정하여, 해당 지역의 레포트를 받아 볼 수 있어요.
              </SettingSubTitle>
            </CompanySettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </CompanySettingBtn>
        </CompanySettingView>

        <NotificationSettingView>
          <NotificationSettingBtn>
            <NotificationSettingInnerView>
              <SettingMainTitle>알림 설정</SettingMainTitle>
              <SettingSubTitle>
                특정 예보를 키고 끄거나, 강도를 낮출 수 있어요
              </SettingSubTitle>
            </NotificationSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </NotificationSettingBtn>
        </NotificationSettingView>

        <MainScreenSettingView>
          <MainScreenSettingBtn
            onPress={() => navigation.navigate('MainScreenSetting')}
          >
            <MainScreenSettingInnerView>
              <SettingMainTitle>메인 화면 날씨 상세 정보</SettingMainTitle>
              <SettingSubTitle>
                메인 화면에 표시되는 날씨 상세 정보를 변경할 수 있어요.
              </SettingSubTitle>
            </MainScreenSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </MainScreenSettingBtn>
        </MainScreenSettingView>
      </SettingsView>
      <PrivacySettingView>
        <PrivacySettingBtn>
          <PrivacySettingInnerView>
            <SettingMainTitle>개인정보 설정</SettingMainTitle>
            <SettingSubTitle>
              사용자 정보와 계정에 대해 변경할 수 있어요.
            </SettingSubTitle>
          </PrivacySettingInnerView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </PrivacySettingBtn>
      </PrivacySettingView>
    </Wrapper>
  );
};

export default Settings;
