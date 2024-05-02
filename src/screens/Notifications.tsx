import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const ExampleText = styled.Text`
  font-size: 50px;
`;

const Notifications = () => {
  return (
    <Wrapper>
      <ExampleText>hello</ExampleText>
    </Wrapper>
  );
};

export default Notifications;
