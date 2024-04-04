import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const Example = styled.Text`
  font-size: 30px;
`;

const AskNotificationTime = () => {
  return (
    <Wrapper>
      <Example>안녕</Example>
    </Wrapper>
  );
};

export default AskNotificationTime;
