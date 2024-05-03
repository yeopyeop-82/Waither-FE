import React, { useState } from 'react';
import styled from 'styled-components/native';
import settingBtn from '../assets/images/ic-nav-back.png';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useRecoilValue } from 'recoil';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const HeaderView = styled.View`
  display: flex;
  width: 100%;
  flex: 0.05;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  margin-bottom: 2px;
  margin-left: 90px;
  margin-right: 105px;
  font-size: 15px;
`;

const HeaderBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const HeaderBtnTitle = styled.Text`
  color: ${MAIN_COLOR};
`;

const HeaderBackBtn = styled.TouchableOpacity``;

const HeaderArrow = styled.Image`
  transform: scale(0.8);
`;

const TipTitle = styled.Text`
  margin-top: 50px;
  text-align: center;
  font-size: 15px;
`;

const SliderTitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 87%;
  justify-content: space-between;
`;

const SliderTitle = styled.Text`
  font-size: 13px;
`;

const TempResponsivenessView = styled.View`
  background-color: ${MAIN_COLOR};
  width: 100%;
  flex: 0.3;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  height: 35%;
  position: absolute;
  bottom: 0px;
  align-items: center;
`;

const TempReponsivenessTitle = styled.Text`
  /* color: ${MAIN_COLOR}; */
  color: ${MAIN_COLOR};
  padding-left: 20px;
  letter-spacing: 35px;
  font-size: 45px;
  z-index: 1;
  position: absolute;
  font-weight: 600;
`;

const TemperatureMainTitle = styled.Text`
  color: white;
  margin-top: 25px;
  font-size: 20px;
`;

const Username = styled.Text`
  font-weight: 800;
`;

const TemperatureWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
  margin-top: 40px;
`;

const TemperatureOperrand = styled.Text`
  font-size: 50px;
  padding-bottom: 10px;
  font-weight: 400;
  color: white;
  position: absolute;
  right: 130px;
`;

const TemperatureView = styled.View`
  background-color: white;
  width: 60px;
  height: 73px;
  border-radius: 10px;
  box-shadow: 2px 7px rgba(0, 0, 0, 0.2);
  margin-left: 4px;
`;

const TemperatureSubTitle = styled.Text`
  font-size: 15px;
  color: white;
  text-align: center;
  margin-top: 40px;
`;

const UserDataSetting = () => {
  const navigation = useNavigation();
  const name = useRecoilValue(userNameState);
  const [TempResponsiveness, setTempREsponsiveness] = useState(0);
  const [Operand, setOperand] = useState('');
  const checkTemp = (value) => {
    if (TempResponsiveness > 0) {
      setOperand('+');
    } else {
      setOperand('-');
    }
  };
  console.log(Operand);

  let num: number = TempResponsiveness;
  let RealTemp: string;

  if (num >= 0 && num < 10 && num === Math.floor(num)) {
    RealTemp = '0' + num.toString();
  } else if (num < 0 && num > -10 && num === Math.floor(num)) {
    RealTemp = '-0' + Math.abs(num).toString();
  } else if (num === Math.floor(num)) {
    RealTemp = num.toString();
  } else {
    RealTemp = Math.floor(num).toString();
  }

  // 한 자리 정수일 때 앞에 0을 붙임
  if (
    ((num >= 0 && num < 10) || (num < 0 && num > -10)) &&
    RealTemp.length === 2
  ) {
    RealTemp = '0' + RealTemp.slice(1);
  } else if (num >= 0 && num < 10) {
    RealTemp = '0' + RealTemp;
  }

  // -10일 때 10으로 출력되도록 수정
  if (num === -10 || num === 10) {
    RealTemp = '10';
  } else if (num < 0 && num > -10 && num === Math.floor(num)) {
    RealTemp = '-0' + Math.abs(num).toString();
  }

  // 출력
  console.log(RealTemp);

  return (
    <Wrapper>
      <HeaderView>
        <HeaderBackBtn onPress={() => navigation.navigate('Settings')}>
          <HeaderArrow source={settingBtn}></HeaderArrow>
        </HeaderBackBtn>

        <HeaderTitle>사용자 데이터 설정</HeaderTitle>
        <HeaderBtn>
          <HeaderBtnTitle>완료</HeaderBtnTitle>
        </HeaderBtn>
      </HeaderView>
      <TipTitle>
        Waiter가 제공한 정보가{name}님에게 적절했나요?{'\n'}하단 바를 조절하여
        더욱 맞춤형된 정보를 받으실 수 있어요!
      </TipTitle>
      <Slider
        style={{ width: 290, height: 10, marginTop: 120 }}
        minimumValue={-10}
        maximumValue={+10} // 최대 값 변경
        minimumTrackTintColor="#D9D9D9"
        maximumTrackTintColor="#D9D9D9"
        value={TempResponsiveness} // Slider의 값 설정
        onValueChange={(value) => {
          setTempREsponsiveness(value);
          checkTemp(value);
        }}
        // userWind 값 변경
      />

      <SliderTitleWrapper>
        <SliderTitle>추위를 많이 탐</SliderTitle>
        <SliderTitle>더위를 많이 탐</SliderTitle>
      </SliderTitleWrapper>

      <TempResponsivenessView>
        <TemperatureMainTitle>
          <Username>Waither</Username>님의 온도 민감도
        </TemperatureMainTitle>

        <TemperatureWrapper>
          <TemperatureOperrand>{Operand}</TemperatureOperrand>
          <TempReponsivenessTitle>{RealTemp}</TempReponsivenessTitle>
          <TemperatureView></TemperatureView>
          <TemperatureView></TemperatureView>
        </TemperatureWrapper>
        <TemperatureSubTitle>
          {name} 님은 더위를 많이 타는 편이군요!{'\n'}참고해서 더욱 정확한
          정보를 보내드릴게요!
        </TemperatureSubTitle>
      </TempResponsivenessView>
    </Wrapper>
  );
};

export default UserDataSetting;
