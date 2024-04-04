import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { userWeatherState } from '../recoil/userWeather';

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

const AskTimeZone = () => {
  const weather = useRecoilValue(userWeatherState);

  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskTitle>
          {weather === 'option1' || weather === 'option2' ? (
            <Bold>춥다</Bold>
          ) : (
            <Bold>덥다</Bold>
          )}
          고 느낀
        </AskTitle>
        <AskTitle>
          <Bold>시간대</Bold>가 언제인가요 ?
        </AskTitle>
      </AskTitleWrapper>
    </Wrapper>
  );
};

export default AskTimeZone;
