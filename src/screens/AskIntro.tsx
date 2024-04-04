import React, { useState } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Name = styled.Text``;

const AskIntro = () => {
  return (
    <Wrapper>
      <Name>Ask</Name>
    </Wrapper>
  );
};

export default AskIntro;
