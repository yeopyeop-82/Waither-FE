import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import AskDataboxPng from '../assets/images/img-ask1-databox-check.png';
import {
  userFeelingTimeZoneState,
  userFeelingWeatherState,
  userNameState,
  userNotificationTimeState,
} from '../recoil/userInitInfoRecoil';
import { MAIN_COLOR } from '../styles/color';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  flex: 1;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 50px;
`;

const AskMessageWrapper = styled.View`
  align-items: center;
`;

const AskMessage = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 200;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const AskOutro = () => {
  const name = useRecoilValue(userNameState);
  const feelingWeather = useRecoilValue(userFeelingWeatherState);
  const feelingTimeZone = useRecoilValue(userFeelingTimeZoneState);
  const notificationTime = useRecoilValue(userNotificationTimeState);

  return (
    <Wrapper>
      <Logo resizeMode="contain" source={AskDataboxPng} />
      <AskMessageWrapper>
        <AskMessage>{name} 님의</AskMessage>
        <AskMessage style={{ marginBottom: 30 }}>
          데이터가 저장되었어요.
        </AskMessage>
        <AskMessage>이제 웨이더가</AskMessage>
        <AskMessage>
          {name} 님에게 <Bold>꼭 맞는</Bold>
        </AskMessage>
        <AskMessage>
          <Bold>기상예보를 보내드릴게요.</Bold>
        </AskMessage>
        <AskMessage>
          이름 : {name} / 어제 날씨 : {feelingWeather}
        </AskMessage>
        <AskMessage>
          춥/덥다고 느낀 시간 : {feelingTimeZone} / 알림시간 :{' '}
          {notificationTime}
        </AskMessage>
      </AskMessageWrapper>
    </Wrapper>
  );
};

export default AskOutro;
