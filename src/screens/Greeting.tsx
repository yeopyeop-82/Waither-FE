import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const GreetingTitle = styled.Text`
  font-size: 30px;
  margin-bottom: 15px;
  font-weight: 800;
`;

const GreetingMessageWrapper = styled.View`
  align-items: center;
`;

const GreetingMessage = styled.Text`
  font-size: 30px;
`;

const BoldText = styled.Text`
  font-weight: 800;
`;

const Greeting = () => {
  return (
    <Wrapper>
      <GreetingTitle>안녕하세요.</GreetingTitle>
      <GreetingMessageWrapper>
        <GreetingMessage>
          저는 당신의 <BoldText>가상 비서</BoldText>
        </GreetingMessage>
        <GreetingMessage>
          <BoldText>웨이더</BoldText>에요!
        </GreetingMessage>
      </GreetingMessageWrapper>
    </Wrapper>
  );
};

export default Greeting;
