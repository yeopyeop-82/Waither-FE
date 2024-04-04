import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { userWeatherState } from '../recoil/userWeather';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const ExampleText = styled.Text`
  font-size: 20px;
`;

const AskTimeZone = () => {
  const weather = useRecoilValue(userWeatherState);

  return (
    <Wrapper>
      <ExampleText>{weather}</ExampleText>
    </Wrapper>
  );
};

export default AskTimeZone;
