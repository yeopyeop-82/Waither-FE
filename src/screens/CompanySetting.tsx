import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { USER_WIDTH } from '../styles/dimension';
import Pngwing from '../assets/images/pngwing.svg';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: '#E0E1E4';
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.1;
  flex-direction: row;
  width: 90%;
  border-radius: 8px;
  margin-top: 20px;
  background-color: white;
  align-items: center;
`;

const ToggleSwitch = styled.Switch`
  transform: scale(0.8);
  margin-right: 17px;
`;

const CustomServiceTitleView = styled.View`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100%;
  flex: 1;
  margin-left: 15px;
`;
const CustomServiceMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const CustomServiceSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const SettingSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const CompanyLocationSettingView = styled.View`
  display: flex;
  flex: 0.12;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: white;
`;

const CompanyLocationSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CompanyLocationSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const SearchCompanyView = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: row;
`;

const SearchCompanyTextInputView = styled.View`
  border: 1px solid ${MAIN_COLOR};
  margin-top: 10px;
  margin-left: 20px;
  background-color: rgba(81, 137, 245, 0.1);
  border-radius: 13px;
  width: 80%;
  height: 5%;
  padding-left: 8px;
  flex-direction: row;
  align-items: center;
`;

const SearchCompanyTextInput = styled.TextInput`
  width: 100%;
`;

const SearchCompanyCancleBtn = styled.TouchableOpacity`
  margin-top: 18px;
  margin-left: 10px;
`;

const SearchCompanyText = styled.Text`
  color: ${MAIN_COLOR};
`;

const CompanySetting = () => {
  const [isCompanyReportToggleEnabled, setIsCompanyReportToggleEnabled] =
    useState(false);
  const [isCompanyReportEnabled, setIsCompanyReportEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsCompanyReportToggleEnabled((previousState) => !previousState);
    setIsCompanyReportEnabled(isCompanyReportToggleEnabled);
  };

  useEffect(() => {
    setIsCompanyReportEnabled(isCompanyReportToggleEnabled);
  }, [setIsCompanyReportEnabled, isCompanyReportToggleEnabled]);
  // ===============================================================
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1%', '100%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  //===============================================================
  return (
    <Wrapper>
      <UserCustomSettingView>
        <CustomServiceTitleView>
          <CustomServiceMainTitle>직장 지역 레포트 받기</CustomServiceMainTitle>
          <CustomServiceSubTitle>
            외출 전 직장 지역의 기상정보를 받을 수 있어요.
          </CustomServiceSubTitle>
        </CustomServiceTitleView>
        <ToggleSwitch
          value={isCompanyReportToggleEnabled}
          onValueChange={toggleSwitch}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>

      <GestureHandlerRootView style={{ flex: 1, width: USER_WIDTH }}>
        <BottomSheetModalProvider>
          <CompanyLocationSettingView>
            <CompanyLocationSettingBtn onPress={handlePresentModalPress}>
              <CompanyLocationSettingInnerView>
                <SettingMainTitle>직장 지역 설정</SettingMainTitle>
                <SettingSubTitle>
                  직장 지역을 설정하여, 해당 지역의 레포트를 받아 볼 수 있어요.
                </SettingSubTitle>
              </CompanyLocationSettingInnerView>
              <SettingArrow source={settingBtn}></SettingArrow>
            </CompanyLocationSettingBtn>
          </CompanyLocationSettingView>

          <BottomSheetModal
            style={{ flex: 1 }}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <SearchCompanyView>
              <SearchCompanyTextInputView>
                <Pngwing width={25} height={25} style={{ zIndex: 1 }}></Pngwing>
                <SearchCompanyTextInput></SearchCompanyTextInput>
              </SearchCompanyTextInputView>
              <SearchCompanyCancleBtn onPress={handleDismissModalPress}>
                <SearchCompanyText>취소</SearchCompanyText>
              </SearchCompanyCancleBtn>
            </SearchCompanyView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default CompanySetting;
