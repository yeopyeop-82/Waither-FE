import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const ExampleText = styled.Text``;

const GreetNaming = () => {
  return (
    <Wrapper>
      <ExampleText>GreetNaming 입니다.</ExampleText>
    </Wrapper>
  );
};

export default GreetNaming;
