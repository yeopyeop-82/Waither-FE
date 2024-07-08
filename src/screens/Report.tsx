import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import styled from 'styled-components/native';
import AskDataboxIcon from '../assets/images/img-ask1-databox-shadow.svg';
import NavBackIcon from '../assets/images/ic-nav-back.svg';
import DownLoadIcon from '../assets/images/download_logo.svg';
import TempIcon from '../assets/images/ic_tem.svg';
import WindIcon from '../assets/images/ic_wind.svg';
import UpIcon from '../assets/images/up-arrow.svg';
import DownIcon from '../assets/images/down-arrow.svg';
import CloudIcon from '../assets/images/ic_cloud.svg';
import DirectionIcon from '../assets/images/direction.svg';
import DustIcon from '../assets/images/ic-dust.svg';
import PollenIcon from '../assets/images/ic-pollen.svg';
import CautionIcon from '../assets/images/caution.svg';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
const HeaderView = styled.View`
  display: flex;
  width: 100%;
  flex: 0.05;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  margin-top: 4px;
  margin-bottom: 2px;
  font-size: 20px;
  font-weight: 800;
  padding-right: 8px;
  color: white;
`;

const HeaderBtn = styled.TouchableOpacity``;

const ReportView = styled.View`
  width: 100%;
  flex: 1;
`;

const Date = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 800;
  margin-left: 26px;
  margin-top: 15px;
`;

const ReportScrollView = styled.ScrollView`
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 8px;
  margin-left: 26px;
  margin-right: 30px;
`;

const MessageView = styled.View`
  background-color: ${MAIN_COLOR};
  width: 345px;
  height: 175px;
  border-radius: 20px;
  border: 0.4px solid white;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

const WeatherMessageView = styled.View`
  width: 241px;
  height: 38px;
`;

const WeatherMessageBoxView = styled.View`
  margin-top: 20px;
`;

const WeatherMessageBox = styled.View`
  width: auto;
  height: 38px;
  background-color: rgb(117, 154, 240);
  border: 0.4px solid white;
  border-radius: 15px;
  margin-bottom: 11px;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
`;

const WeahtherMessageText = styled.Text`
  color: white;
  font-weight: 800;
`;

const ExplainText = styled.Text`
  color: white;
  margin-left: 8px;
  font-weight: 800;
`;

const WeatherChangeView = styled.View`
  width: 100%;
  height: 171px;
  margin-top: 6px;
`;

const WeatherChangeMessageView = styled.View`
  width: 345px;
  height: 68px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.4px solid white;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const WeahtherChangeTextView = styled.View`
  flex-direction: column;
  width: 70%;
`;

const WeatherChangeMainText = styled.Text`
  color: ${GREY_COLOR};
  margin-bottom: 5px;
`;

const WeatherChangeSubText = styled.Text`
  color: white;
`;

const UserAnswerView = styled.View`
  width: 345px;
  height: 145px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.4px solid white;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 12px;
`;
const UserAnswerText = styled.Text`
  color: white;
  font-size: 15px;
  text-align: center;
`;
const Percent = styled.Text`
  margin-top: 20px;
  left: 140px;
  color: white;
`;

const PercentBar = styled.View`
  width: 95%;
  height: 19px;
  border: 0.4px solid white;
  border-radius: 15px;
`;

const WeatherDetailWrapper = styled.View`
  width: 345px;
  margin-top: 10px;
  margin-bottom: 200px;
  justify-content: center;
`;

const TempRainWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const TempRainBox = styled.View`
  width: 47%;
  height: 138px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.4px solid white;
  align-items: center;
  justify-content: center;
`;

const TempRainMainText = styled.Text`
  /* margin-top: 10px; */
  font-size: 13px;
  color: white;
`;

const Temp = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 800;
  margin-top: 20px;
`;

const TempRainSubText = styled.Text`
  font-size: 13px;
  color: white;
  margin-top: 20px;
`;

const WindWrapper = styled.View`
  width: 100%;
  height: 138px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.4px solid white;
  margin-top: 15px;
  flex-direction: row;
`;

const WindBox = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const WindMainText = styled.Text`
  color: white;
  font-size: 12px;
`;

const WindSubText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 800;
  margin-top: 20px;
`;

const CustomWrapper = styled.View`
  width: 100%;
  height: 138px;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const CustomBox = styled.View`
  width: 110px;
  height: 138px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 0.4px solid white;
  align-items: center;
  justify-content: center;
`;

const CustomMainText = styled.Text`
  color: white;
  font-size: 14px;
`;
const CustomSubText = styled.Text`
  color: white;
  font-size: 14px;
`;

const PollenSubTextView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Report = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <LinearGradient
        colors={[
          'rgba(91, 149, 239, 1)',
          'rgba(123, 145, 175, 1)',
          'rgba(118, 123, 127, 1)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2416, 0.5188, 0.9765]}
        style={{ flex: 1, width: '100%' }}
      >
        <HeaderView>
          <HeaderBtn onPress={() => navigation.navigate('MainScreen')}>
            <NavBackIcon width={46} height={46} />
          </HeaderBtn>

          <HeaderTitle>Report</HeaderTitle>
          <HeaderBtn>
            <DownLoadIcon style={{ marginRight: 13, marginTop: 4 }} />
          </HeaderBtn>
        </HeaderView>
        <Date>2024년 8월 23일 (목)</Date>
        <ReportView>
          <ReportScrollView>
            <MessageView>
              <AskDataboxIcon
                height={73.28}
                width={53}
                style={{ marginTop: 50 }}
              />
              <WeatherMessageView>
                <WeatherMessageBoxView>
                  <WeatherMessageBox>
                    <WeahtherMessageText>
                      오늘은 바람이 많이 불어요!
                    </WeahtherMessageText>
                  </WeatherMessageBox>
                  <WeatherMessageBox>
                    <WeahtherMessageText>
                      오후 7시 경에 비가 올 예정이에요!
                    </WeahtherMessageText>
                  </WeatherMessageBox>
                  <WeatherMessageBox>
                    <WeahtherMessageText>
                      오늘은 꽃가루가 많이 날릴 예정이에요!
                    </WeahtherMessageText>
                  </WeatherMessageBox>
                </WeatherMessageBoxView>
              </WeatherMessageView>
            </MessageView>
            <ExplainText>날씨 변화</ExplainText>
            <WeatherChangeView>
              <WeatherChangeMessageView>
                <TempIcon
                  width={21}
                  height={32}
                  style={{ marginLeft: 18, marginRight: 18 }}
                />
                <WeahtherChangeTextView>
                  <WeatherChangeMainText>기온</WeatherChangeMainText>
                  <WeatherChangeSubText>
                    어제보다 5도 낮아요!
                  </WeatherChangeSubText>
                </WeahtherChangeTextView>
                <DownIcon width={22} height={22} />
              </WeatherChangeMessageView>
              <WeatherChangeMessageView>
                <WindIcon
                  width={21}
                  height={32}
                  style={{ marginLeft: 18, marginRight: 18 }}
                />
                <WeahtherChangeTextView>
                  <WeatherChangeMainText>바람</WeatherChangeMainText>
                  <WeatherChangeSubText>
                    어제보다 바람이 많이 불어요!
                  </WeatherChangeSubText>
                </WeahtherChangeTextView>
                <UpIcon width={22} height={22} />
              </WeatherChangeMessageView>
            </WeatherChangeView>
            <ExplainText>유저들의 답변</ExplainText>
            <UserAnswerView>
              <UserAnswerText>
                전체 유저의 0%가{'\n'} 오늘 춥다고 답변했습니다.
              </UserAnswerText>
              <Percent>0%</Percent>
              <PercentBar></PercentBar>
            </UserAnswerView>
            <ExplainText>날씨 세부 사항</ExplainText>
            <WeatherDetailWrapper>
              <TempRainWrapper>
                <TempRainBox style={{ marginRight: 18 }}>
                  <TempRainMainText>평균 온도</TempRainMainText>
                  <Temp>5'c</Temp>
                  <TempRainSubText>
                    최고: {'            '}최저:{' '}
                  </TempRainSubText>
                </TempRainBox>
                <TempRainBox>
                  <TempRainMainText>강수량</TempRainMainText>
                  <CloudIcon width={38} height={32} style={{ marginTop: 20 }} />
                  <TempRainSubText>1~3mm</TempRainSubText>
                </TempRainBox>
              </TempRainWrapper>

              <WindWrapper>
                <WindBox>
                  <WindMainText>풍속</WindMainText>
                  <WindIcon width={30} height={26} style={{ marginTop: 20 }} />
                  <WindSubText>2m/s~4m/s</WindSubText>
                </WindBox>
                <WindBox>
                  <WindMainText>풍향</WindMainText>
                  <DirectionIcon
                    width={39}
                    height={39}
                    style={{ marginTop: 20 }}
                  />
                  <WindSubText>남남동</WindSubText>
                </WindBox>
              </WindWrapper>
              <CustomWrapper>
                <CustomBox>
                  <CustomMainText>미세먼지</CustomMainText>
                  <DustIcon width={60} height={58} style={{ marginTop: 10 }} />
                  <CustomSubText>좋음 | 20ug/m</CustomSubText>
                </CustomBox>
                <CustomBox>
                  <CustomMainText>꽃가루</CustomMainText>
                  <PollenIcon
                    width={50}
                    height={50}
                    style={{ marginTop: 10 }}
                  />
                  <PollenSubTextView>
                    <CautionIcon width={11} height={11} />
                    <CustomSubText>높음</CustomSubText>
                  </PollenSubTextView>
                </CustomBox>
                <CustomBox>
                  <CustomMainText>예시 테스트</CustomMainText>
                </CustomBox>
              </CustomWrapper>
            </WeatherDetailWrapper>
          </ReportScrollView>
        </ReportView>
      </LinearGradient>
    </Wrapper>
  );
};

export default Report;
