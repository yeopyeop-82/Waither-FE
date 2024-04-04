import React from 'react';
import styled from 'styled-components/native';

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

const AskWeather = () => {
  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskTitle>
          <Bold>어제 날씨</Bold>는
        </AskTitle>
        <AskTitle>어떠셨나요?</AskTitle>
      </AskTitleWrapper>
    </Wrapper>
  );
};

export default AskWeather;
