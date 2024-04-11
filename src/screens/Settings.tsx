import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import Databox from '../assets/images/ic-ask-databox.svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { userFeelingWeatherState } from '../recoil/userInitInfoRecoil';

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

const ModalView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  border-radius: 15px;
  width: 90%;
  height: 230px;
  background-color: white;
`;

const ModalText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  margin: 3px 5px;
`;

const ModalBtnView = styled.View`
  width: 85%;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

const ModalTurnOffBtn = styled.TouchableOpacity`
  background-color: ${GREY_COLOR};
  width: 48%;
  height: 42px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
const ModalTurnOnBtn = styled.TouchableOpacity`
  background-color: ${MAIN_COLOR};
  width: 48%;
  height: 42px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ModalTurnOffBtnText = styled.Text`
  color: black;
`;
const ModalTurnOnBtnText = styled.Text`
  color: white;
`;

const DataBoxView = styled.View`
  width: 100%;
  z-index: 1;
  justify-content: center;
  position: relative;
  align-items: center;
  top: 15px;
`;

const Settings = () => {
  const navigation = useNavigation();
  const [previousState, setPreviousState] = useState(false);
  const [isCustomServiceToggleEnabled, setIsCustomServiceToggleEnabled] =
    useState(false);
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleSwitch = () => {
    // 이전 상태를 이용
    setIsCustomServiceToggleEnabled(!isCustomServiceEnabled);

    // iscustomserviceEnabled가 false이기에 처음에는 else문으로 빠짐
    // 그리고 토글이 켜지며 true가 된다.
    // 토글을 다시 눌러 끄려는 순간 true 이기 때문에 modal이 보여진다.
    if (isCustomServiceEnabled) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    setIsCustomServiceEnabled(isCustomServiceToggleEnabled);
  }, [setIsCustomServiceEnabled, isCustomServiceToggleEnabled]);

  console.log(isCustomServiceEnabled);

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
      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'bounceOutUp'}
        animationOutTiming={600}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <DataBoxView>
          <Databox width={60} height={60}></Databox>
        </DataBoxView>

        <ModalView>
          <ModalText>해당 모드를 끄시면,</ModalText>
          <ModalText>재설문 알림이 전송되지 않지만</ModalText>
          <ModalText style={{ color: 'red' }}>
            기존 데이터가 모두 삭제되고
          </ModalText>
          <ModalText style={{ color: 'red' }}>
            더이상 사용자 맞춤 서비스를 사용하실 수 없어요.
          </ModalText>
          <ModalBtnView>
            <ModalTurnOffBtn
              onPress={() => {
                setIsCustomServiceEnabled(false);
                setModalVisible(false);
              }}
            >
              <ModalTurnOffBtnText>그래도 끌래요.</ModalTurnOffBtnText>
            </ModalTurnOffBtn>
            <ModalTurnOnBtn
              onPress={() => {
                setModalVisible(false);
                setIsCustomServiceEnabled(true);
              }}
            >
              <ModalTurnOnBtnText>다시 생각해볼게요.</ModalTurnOnBtnText>
            </ModalTurnOnBtn>
          </ModalBtnView>
        </ModalView>
      </Modal>
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
