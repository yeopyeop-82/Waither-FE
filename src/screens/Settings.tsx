import React, { useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
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

const SettingsView = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  background-color: white;
`;

const SettingView = styled.View`
  width: 100%;
  margin-left: 25px;
  flex-direction: row;
  align-items: center;
`;

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
  margin-top: 45px;
`;

const CompanyView = styled.TouchableOpacity`
  display: flex;
  width: 80%;
  justify-content: center;
`;

const NotificationView = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 40px;
`;

const MainScreenView = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 40px;
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

const PrivacySettingInnerView = styled.View`
  width: 80%;
  margin-left: 25px;
  flex-direction: column;
`;

const PrivacySettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
  margin-top: 9px;
`;

const Settings = () => {
  const navigation = useNavigation();
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsCustomServiceEnabled((previousState) => !previousState);
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
          value={isCustomServiceEnabled}
          onValueChange={toggleSwitch}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>
      <SettingsView>
        <SettingView>
          <CompanyView>
            <SettingMainTitle>직장 지역 설정</SettingMainTitle>
            <SettingSubTitle>
              직장 지역을 설정하여, 해당 지역의 레포트를 받아 볼 수 있어요.
            </SettingSubTitle>
          </CompanyView>
          <SettingArrow
            source={settingBtn}
            style={{ marginTop: 0 }}
          ></SettingArrow>
        </SettingView>
        <SettingView>
          <NotificationView>
            <SettingMainTitle>알림 설정</SettingMainTitle>
            <SettingSubTitle>
              특정 예보를 키고 끄거나, 강도를 낮출 수 있어요.
            </SettingSubTitle>
          </NotificationView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </SettingView>
        <SettingView>
          <MainScreenView>
            <SettingMainTitle>메인 화면 날씨 상세 정보</SettingMainTitle>
            <SettingSubTitle>
              메인 화면에 표시되는 날씨 상세 정보를 변경할 수 있어요.
            </SettingSubTitle>
          </MainScreenView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </SettingView>
      </SettingsView>
      <PrivacySettingView>
        <PrivacySettingInnerView>
          <SettingMainTitle>개인정보 설정</SettingMainTitle>
          <SettingSubTitle>
            사용자 정보와 계정에 대해 변경할 수 있어요.
          </SettingSubTitle>
        </PrivacySettingInnerView>
        <PrivacySettingArrow source={settingBtn}></PrivacySettingArrow>
      </PrivacySettingView>
    </Wrapper>
  );
};

export default Settings;
