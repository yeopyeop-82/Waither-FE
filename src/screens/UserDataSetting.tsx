import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import settingBtn from '../assets/images/ic-nav-back.png';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useRecoilValue } from 'recoil';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

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
  const [tempText, setTempText] = useState('');
  const [Operand, setOperand] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const checkTemp = (temp) => {
    if (temp > 0) {
      setOperand('+');
    } else if (temp < 0) {
      setOperand('-');
    } else if (temp == -0 || temp == 0) {
      setOperand('');
    }
  };

  const renderTempResponsiveness = (temp) => {
    if (temp > 0 && temp < 10) {
      setTempText('0' + temp);
    } else if (temp == 10) {
      setTempText('' + temp);
    }

    if (temp < 0 && temp > -10) {
      setTempText('0' + Math.abs(temp));
    } else if (temp == -10) {
      setTempText('' + Math.abs(temp));
    }

    if (temp == 0) {
      setTempText('00');
    }
  };
  console.log(TempResponsiveness);

  const ForUserInfo = (temp) => {
    if (temp > 0) {
      setUserInfo(
        name +
          '님은 더위를 많이 타는 편이군요!\n참고해서 더욱 정확한 정보를 보내드릴게요!',
      );
    } else if (temp < 0) {
      setUserInfo(
        name +
          '님은 추위를 많이 타는 편이군요!\n참고해서 더욱 정확한 정보를 보내드릴게요!',
      );
    } else {
      setUserInfo('온도 민감도를 설정해 주세요');
    }
  };

  //===============================================================

  //Bearer 토큰
  const authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsLmNvbSIsInJvbGUiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcxOTgzMTYwMCwiZXhwIjozMzEzNDc0NTYwMH0.getDuds1kSPZ5SeiGtWukiq5qgLrKQiNnpZAX0f4-Ho';

  //사용자 온도 민감도 호출
  const userWeightPut = async () => {
    const url = 'https://waither.shop/user/setting/user-weight';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      weight: Math.ceil(TempResponsiveness),
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

      alert('정상적으로 설정되었습니다.');
      const res = await response.json();
      console.log('사용자 온도 민감도', res);
    } catch (error) {
      console.error('사용자 온도 민감도', error);
    }
  };

  //외출 요일 및 외출 시간대 호출
  const userWeightGet = async () => {
    const url = 'https://waither.shop/user/setting/user-weight';

    const headers = {
      Authorization: authorization,
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
      setTempREsponsiveness(res.result.weight);
      renderTempResponsiveness(res.result.weight);
      checkTemp(res.result.weight);
      ForUserInfo(res.result.weight);

      console.log(Operand);

      console.log('사용자 온도 민감도', res);
    } catch (error) {
      console.error('사용자 온도 민감도', error);
    }
  };

  useEffect(() => {
    userWeightGet();
  }, []);

  return (
    <Wrapper>
      <HeaderView>
        <HeaderBackBtn onPress={() => navigation.navigate('Settings')}>
          <HeaderArrow source={settingBtn}></HeaderArrow>
        </HeaderBackBtn>

        <HeaderTitle>사용자 데이터 설정</HeaderTitle>
        <HeaderBtn onPress={userWeightPut}>
          <HeaderBtnTitle>완료</HeaderBtnTitle>
        </HeaderBtn>
      </HeaderView>
      <TipTitle>
        Waiter가 제공한 정보가 {name}님에게 적절했나요?{'\n'}하단 바를 조절하여
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
          if (value < 0) {
            setTempREsponsiveness(Math.round(value));
          } else {
            setTempREsponsiveness(Math.ceil(value));
          }
          checkTemp(TempResponsiveness);
          renderTempResponsiveness(TempResponsiveness);
          ForUserInfo(TempResponsiveness);
        }}
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
          <TempReponsivenessTitle>{tempText}</TempReponsivenessTitle>
          <TemperatureView></TemperatureView>
          <TemperatureView></TemperatureView>
        </TemperatureWrapper>
        <TemperatureSubTitle>{userInfo}</TemperatureSubTitle>
      </TempResponsivenessView>
    </Wrapper>
  );
};

export default UserDataSetting;
