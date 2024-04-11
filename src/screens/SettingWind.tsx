import React, { useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import { useRecoilValue } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.7;
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

const WindHeaderView = styled.View`
  flex: 0.25;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const WindHeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
`;
const WindHeaderSubtitle = styled.Text`
  font-size: 15px;
  color: white;
`;

const WindSliderView = styled.View`
  flex: 0.8;
  width: 100%;
  background-color: white;
  border-radius: 50px;
`;

const SettingWind = () => {
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsCustomServiceEnabled((previousState) => !previousState);
  const name = useRecoilValue(userNameState);

  return (
    <Wrapper>
      <WindHeaderView>
        <WindHeaderTitle>10 m/s</WindHeaderTitle>
        <WindHeaderSubtitle>
          {name}님이 설정한 바람 세기를 넘으면 알려드릴게요 !
        </WindHeaderSubtitle>
        <UserCustomSettingView>
          <CustomServiceTitleView>
            <CustomServiceMainTitle>바람 세기 예보 받기</CustomServiceMainTitle>
            <CustomServiceSubTitle>
              {name}님이 설정한 바람 세기
            </CustomServiceSubTitle>
          </CustomServiceTitleView>
          <ToggleSwitch
            value={isCustomServiceEnabled}
            onValueChange={toggleSwitch}
            //toggle 활성화 여부에 따른 색상 설정
            trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
          ></ToggleSwitch>
        </UserCustomSettingView>
      </WindHeaderView>
      <WindSliderView></WindSliderView>
    </Wrapper>
  );
};

export default SettingWind;
