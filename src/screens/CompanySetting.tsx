import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: '#E0E1E4';
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.1;
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

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const CompanyLocationSettingView = styled.View`
  display: flex;
  flex: 0.12;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: white;
`;

const CompanyLocationSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CompanyLocationSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const CompanySetting = () => {
  const navigation = useNavigation();
  const [isCompanyReportToggleEnabled, setIsCompanyReportToggleEnabled] =
    useState(false);
  const [isCompanyReportEnabled, setIsCompanyReportEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsCompanyReportToggleEnabled((previousState) => !previousState);
    setIsCompanyReportEnabled(isCompanyReportToggleEnabled);
  };

  useEffect(() => {
    setIsCompanyReportEnabled(isCompanyReportToggleEnabled);
  }, [setIsCompanyReportEnabled, isCompanyReportToggleEnabled]);

  console.log(isCompanyReportEnabled);
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
          value={isCompanyReportToggleEnabled}
          onValueChange={toggleSwitch}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>
      <CompanyLocationSettingView>
        <CompanyLocationSettingBtn>
          <CompanyLocationSettingInnerView>
            <SettingMainTitle>직장 지역 설정</SettingMainTitle>
            <SettingSubTitle>
              직장 지역을 설정하여, 해당 지역의 레포트를 받아 볼 수 있어요.
            </SettingSubTitle>
          </CompanyLocationSettingInnerView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </CompanyLocationSettingBtn>
      </CompanyLocationSettingView>
    </Wrapper>
  );
};

export default CompanySetting;
