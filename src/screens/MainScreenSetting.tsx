import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const ToggleWrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: 'rgb(224, 225, 228)';
  /* background-color: red; */
  flex: 0.4;
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

const MainScreenSetting = () => {
  const [isRainfallToggleEnabled, setIsRainfallToggleEnabled] = useState(false);
  const [isRainfallEnabled, setIsRainfallEnabled] = useState(false);
  const [isWindToggleEnabled, setIsWindToggleEnabled] = useState(false);
  const [isWindEnabled, setIsWindEnabled] = useState(false);
  const [isFineDustToggleEnabled, setIsFineDustToglleEnabled] = useState(false);
  const [isFineDustEnabled, setIsFineDustEnabled] = useState(false);
  const RainFalltoggleSwitch = () => {
    setIsRainfallToggleEnabled((previousState) => !previousState);
    setIsRainfallEnabled(isRainfallToggleEnabled);
  };
  const WindtoggleSwitch = () => {
    setIsWindToggleEnabled((previousState) => !previousState);
    setIsWindEnabled(isWindToggleEnabled);
  };
  const FineDusttoggleSwitch = () => {
    setIsFineDustToglleEnabled((previousState) => !previousState);
    setIsFineDustEnabled(isFineDustToggleEnabled);
  };

  console.log(isRainfallEnabled);
  console.log(isWindEnabled);
  console.log(isFineDustEnabled);

  useEffect(() => {
    setIsRainfallEnabled(isRainfallToggleEnabled);
    setIsWindEnabled(isWindToggleEnabled);
    setIsFineDustEnabled(isFineDustToggleEnabled);
  }, [
    setIsRainfallEnabled,
    isRainfallToggleEnabled,
    setIsWindEnabled,
    isWindToggleEnabled,
    setIsFineDustEnabled,
    isFineDustToggleEnabled,
  ]);

  return (
    <Wrapper>
      <ToggleWrapper>
        <MainScreenSettingView>
          <MainScreenTitleView>
            <CustomServiceMainTitle>강수량 보기</CustomServiceMainTitle>
            <CustomServiceSubTitle>
              메인 화면에서 강수량을 볼 수 있어요.
            </CustomServiceSubTitle>
          </MainScreenTitleView>
          <ToggleSwitch
            value={isRainfallToggleEnabled}
            onValueChange={RainFalltoggleSwitch}
            //toggle 활성화 여부에 따른 색상 설정
            trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
          ></ToggleSwitch>
        </MainScreenSettingView>
        <MainScreenSettingView>
          <MainScreenTitleView>
            <CustomServiceMainTitle>풍량, 풍속 보기</CustomServiceMainTitle>
            <CustomServiceSubTitle>
              메인 화면에서 풍량, 풍속을 볼 수 있어요.
            </CustomServiceSubTitle>
          </MainScreenTitleView>
          <ToggleSwitch
            value={isWindToggleEnabled}
            onValueChange={WindtoggleSwitch}
            //toggle 활성화 여부에 따른 색상 설정
            trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
          ></ToggleSwitch>
        </MainScreenSettingView>
        <MainScreenSettingView>
          <MainScreenTitleView>
            <CustomServiceMainTitle>미세먼지 보기</CustomServiceMainTitle>
            <CustomServiceSubTitle>
              메인 화면에서 미세먼지를 볼 수 있어요.
            </CustomServiceSubTitle>
          </MainScreenTitleView>
          <ToggleSwitch
            value={isFineDustToggleEnabled}
            onValueChange={FineDusttoggleSwitch}
            //toggle 활성화 여부에 따른 색상 설정
            trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
          ></ToggleSwitch>
        </MainScreenSettingView>
      </ToggleWrapper>
    </Wrapper>
  );
};
export default MainScreenSetting;
