import React from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userFeelingWeatherState } from '../recoil/userInitInfoRecoil';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const AskTitleWrapper = styled.View`
  align-items: center;
`;

const AskTitle = styled.Text`
  font-size: 30px;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const AskWeatherButtonWrapper = styled.View`
  width: 60%;
  flex: 0.65;
  align-items: center;
  margin-top: 40px;
`;

const AskWeatherButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 0.14;
  border-radius: 30px;
  margin-bottom: 10px;
`;

const AskWeatherButtonText = styled.Text`
  font-size: 15px;
  font-weight: 800;
`;

const SubmitButton = styled(AskWeatherButton)`
  margin-top: 30px;
  background-color: ${MAIN_COLOR};
`;

const SubmitButtonText = styled(AskWeatherButtonText)`
  color: white;
`;

// eslint-disable-next-line react/prop-types
const AskWeatherRadioButton = ({ label, selected, onSelect }) => (
  <AskWeatherButton
    activeOpacity={1}
    onPress={onSelect}
    style={{ backgroundColor: selected ? `${MAIN_COLOR}` : '#e0e1e4' }}
  >
    <AskWeatherButtonText style={{ color: selected ? '#FFF' : '#9f9f9f' }}>
      {label}
    </AskWeatherButtonText>
  </AskWeatherButton>
);

const AskWeather = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useRecoilState(
    userFeelingWeatherState,
  );
  const weatherOptions = [
    { label: '추웠어요', value: '1' },
    { label: '조금 추웠어요', value: '2' },
    { label: '딱 좋았어요', value: '3' },
    { label: '조금 더웠어요', value: '4' },
    { label: '더웠어요', value: '5' },
  ];

  const storeWeather = async (weather) => {
    try {
      await AsyncStorage.setItem('userWeather', weather);
      console.log('저장됨');
    } catch (e) {
      console.log("Error storing user's weather:", e);
    }
  };

  const handleSubmit = () => {
    storeWeather(selectedValue);
    navigation.navigate('AskTimeZone');
  };

  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskTitle>
          <Bold>어제 날씨</Bold>는
        </AskTitle>
        <AskTitle>어떠셨나요?</AskTitle>
      </AskTitleWrapper>
      <AskWeatherButtonWrapper>
        {weatherOptions.map((option) => (
          <AskWeatherRadioButton
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onSelect={() => setSelectedValue(option.value)}
          />
        ))}
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>확인</SubmitButtonText>
        </SubmitButton>
      </AskWeatherButtonWrapper>
    </Wrapper>
  );
};

export default AskWeather;
