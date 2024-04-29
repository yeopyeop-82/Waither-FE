import React from 'react';
import styled from 'styled-components/native';
import settingBtn from '../assets/images/ic-nav-back.png';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useRecoilValue } from 'recoil';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const HeaderView = styled.View`
  display: flex;
  width: 100%;
  flex: 0.05;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  margin-bottom: 2px;
  margin-left: 90px;
  margin-right: 105px;
  font-size: 15px;
`;

const HeaderBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const HeaderBtnTitle = styled.Text`
  color: ${MAIN_COLOR};
`;

const HeaderArrow = styled.Image`
  transform: scale(0.8);
`;

const TipTitle = styled.Text`
  margin-top: 50px;
  text-align: center;
  font-size: 15px;
`;

const UserDataSetting = () => {
  const name = useRecoilValue(userNameState);
  return (
    <Wrapper>
      <HeaderView>
        <HeaderArrow source={settingBtn}></HeaderArrow>
        <HeaderTitle>사용자 데이터 설정</HeaderTitle>
        <HeaderBtn>
          <HeaderBtnTitle>완료</HeaderBtnTitle>
        </HeaderBtn>
      </HeaderView>
      <TipTitle>
        Waiter가 제공한 정보가{name}님에게 적절했나요?{'\n'}하단 바를 조절하여
        더욱 맞춤형된 정보를 받으실 수 있어요!
      </TipTitle>
    </Wrapper>
  );
};

export default UserDataSetting;
