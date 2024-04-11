import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const ExampleText = styled.Text`
  font-size: 30px;
`;

const SettingWind = () => {
  return (
    <Wrapper>
      <ExampleText>Hello</ExampleText>
    </Wrapper>
  );
};

export default SettingWind;
