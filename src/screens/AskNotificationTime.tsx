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

const AskSubTitle = styled.Text`
  font-size: 23px;
  margin-bottom: 15px;
`;

const AskTitle = styled.Text`
  font-size: 30px;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const AskNotificationTime = () => {
  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskSubTitle>마지막 단계에요!</AskSubTitle>
        <AskTitle>
          <Bold>날씨 알림</Bold>을 받으실
        </AskTitle>
        <AskTitle>
          <Bold>시간대</Bold>를 설정해주세요.
        </AskTitle>
      </AskTitleWrapper>
    </Wrapper>
  );
};

export default AskNotificationTime;
