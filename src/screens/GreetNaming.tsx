import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const GreetNamingWrapper = styled.View`
  margin-top: 50px;
  width: 90%;
`;

const GreetNamingTitle = styled.Text`
  font-size: 25px;
  font-weight: 800;
`;

const GreetNaming = () => {
  return (
    <Wrapper>
      <GreetNamingWrapper>
        <GreetNamingTitle>제가 뭐라고 부르면 될까요 ?</GreetNamingTitle>
      </GreetNamingWrapper>
    </Wrapper>
  );
};

export default GreetNaming;
