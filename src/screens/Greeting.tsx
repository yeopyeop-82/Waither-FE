import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('GreetNaming'); // Replace 'GreetNaming' with the actual name of your screen
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

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
