import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import NotificationIcon from '../assets/images/ic-main-noti-unread.svg';
import SettingIcon from '../assets/images/ic-main-settings.svg';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 1;
`;

const ExampleText = styled.Text`
  color: black;
`;

const MainHeader = styled.View`
  margin-top: 58px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const MainHeaderLeft = styled.View`
  flex: 1;
`;

const MainHeaderCenter = styled.View`
  flex: 1;
  align-items: center;
`;

const MainHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const MainHearderRight = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const MainScreen = () => {
  return (
    <Wrapper>
      <LinearGradient
        colors={[
          'rgba(179, 166, 155, 0.7)',
          'rgba(110, 131, 149, 0.7)',
          'rgba(118, 123, 127, 0.7)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0416, 0.5188, 0.9765]}
        style={{ flex: 1, width: '100%' }}
      >
        <MainHeader>
          <MainHeaderLeft></MainHeaderLeft>
          <MainHeaderCenter>
            <MainHeaderText>NOW.</MainHeaderText>
          </MainHeaderCenter>
          <MainHearderRight>
            <NotificationIcon height={44} />
            <SettingIcon height={44} />
          </MainHearderRight>
        </MainHeader>
      </LinearGradient>
    </Wrapper>
  );
};

export default MainScreen;
