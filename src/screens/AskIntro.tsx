import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userNameState } from '../recoil/userNameRecoil';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Name = styled.Text``;

const AskIntro = () => {
  const name = useRecoilValue(userNameState);
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default AskIntro;
