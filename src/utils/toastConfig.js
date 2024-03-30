import React from 'react';
import { USER_WIDTH } from '../styles/dimension';
import { MAIN_COLOR } from '../styles/color';
import styled from 'styled-components/native';
import ToastIcon from '../assets/images/ic-email.svg';

const WaitherToast = styled.View`
  color: white;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: ${USER_WIDTH - 30}px;
  background-color: ${MAIN_COLOR};
  border-radius: 20px;
`;

const WaitherToastTextWrapper = styled.View`
  position: relative;
  justify-content: center;
  align-items: flex-start;
`;

const WaitherToastText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

const ToastIconWrapper = styled.View`
  margin-left: 10px;
  margin-right: 5px;
`;

export const toastConfig = {
  waitherToast: ({ text1, text2 }) => (
    <WaitherToast>
      <ToastIconWrapper>
        <ToastIcon width={50} height={50} />
      </ToastIconWrapper>
      <WaitherToastTextWrapper>
        <WaitherToastText style={{ marginBottom: 3 }}>{text1}</WaitherToastText>
        <WaitherToastText>{text2}</WaitherToastText>
      </WaitherToastTextWrapper>
    </WaitherToast>
  ),
};
