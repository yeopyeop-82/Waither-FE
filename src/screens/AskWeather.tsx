import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';

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
  align-items: center;
  margin-top: 40px;
`;

const AskWeatherButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 0.12;
  background-color: red;
`;

const AskWeatherButtonText = styled.Text`
  font-size: 15px;
`;

const AskWeather = () => {
  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskTitle>
          <Bold>어제 날씨</Bold>는
        </AskTitle>
        <AskTitle>어떠셨나요?</AskTitle>
      </AskTitleWrapper>
      <AskWeatherButtonWrapper></AskWeatherButtonWrapper>
    </Wrapper>
  );
};

export default AskWeather;
