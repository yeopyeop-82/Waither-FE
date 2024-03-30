import React from 'react';
import { View, Text } from 'react-native';
import { USER_WIDTH } from '../styles/dimension';
import { MAIN_COLOR } from '../styles/color';
import styled from 'styled-components/native';
import ToastIcon from '../assets/images/ic-email.svg';

const WaitherToast = styled.View`
  top: 20px;
  color: white;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: ${USER_WIDTH - 30}px;
  background-color: ${MAIN_COLOR};
  border-radius: 20px;
`;

const WaitherToastTextWrapper = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

const WaitherToastText = styled.Text`
  color: white;
`;

const ToastIconWrapper = styled.View`
  width: 50px;
  height: 50px;
`;

export const toastConfig = {
  waitherToast: ({ text1, text2 }) => (
    <WaitherToast>
      <ToastIconWrapper>
        <ToastIcon width={30} height={30} />
      </ToastIconWrapper>
      <WaitherToastTextWrapper>
        <WaitherToastText>{text1}</WaitherToastText>
        <WaitherToastText>{text2}</WaitherToastText>
      </WaitherToastTextWrapper>
    </WaitherToast>
  ),
};
