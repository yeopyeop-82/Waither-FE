import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR, GREY_COLOR } from '../styles/color';
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

const PresentCompanyLocationView = styled.View`
  display: flex;
  flex: 0.12;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 25px;
  background-color: white;
`;

const PresentCompanyLocationSubTitle = styled.Text`
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  margin-left: 20px;
  margin-top: 15px;
`;

const PresentCompanyLocationTitle = styled.Text`
  font-size: 17px;
  margin-top: 10px;
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
  margin-right: 70px;
`;

const SearchCompanyView = styled.View`
  display: flex;
  width: 100%;
  height: 1px;
  flex: 1;
  flex-direction: column;
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

const SearchedLocationTextInput = styled.TextInput`
  width: 95%;
`;

const SearchCompanyCancleBtn = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const SearchCompanyText = styled.Text`
  color: ${MAIN_COLOR};
  position: absolute;
  padding-right: 30px;
`;

const CompanyLocationWrapper = styled.View`
  display: flex;
  position: absolute;
  width: 80%;
  margin-top: 55px;
  margin-left: 30px;
  height: 300px;
`;

const CompanyLocationBtn = styled.TouchableOpacity`
  /* margin-bottom: 15px; */
  /* background-color: red; */
`;

const CompanyLocationTitle = styled.Text`
  margin-bottom: 15px;
  color: rgba(0, 0, 0, 0.5);
`;

const CompanySetting = () => {
  const [isCompanyReportToggleEnabled, setIsCompanyReportToggleEnabled] =
    useState();
  const [isCompanyReportEnabled, setIsCompanyReportEnabled] = useState();
  const [searchedLocation, setsearchedLocation] = useState('');
  const [companyLocationList, setCompanyLocationList] = useState([]);
  const [userPresentCompanyLocation, setUserPresentCompanyLocation] =
    useState(null);

  //=================================================================================

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedCompanyLocationsX, setSelectedCompanyLocationsX] =
    useState(null);
  const [selectedCompanyLocationsY, setSelectedCompanyLocationsY] =
    useState(null);

  const toggleSwitch = () => {
    setIsCompanyReportToggleEnabled((previousState) => !previousState);
    setIsCompanyReportEnabled(isCompanyReportToggleEnabled);
  };

  const onChangeCompanyLocation = (text) => {
    setsearchedLocation(text);
  };

  const onPressSelectedLocation = (value) => {
    setSelectedLocation(value);
  };

  const onPressSelectCompanyLocationsX = (value) => {
    setSelectedCompanyLocationsX(value);
  };
  const onPressSelectCompanyLocationsY = (value) => {
    setSelectedCompanyLocationsY(value);
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

  //===========================================================

  //지역 검색 API 호출
  const companyLocationGet = async () => {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${searchedLocation}&analyze_type=similar&page=1&size=30`;

    const headers = {
      Authorization: 'KakaoAK d123b0e487f515ba55f26453d6537fbc',
      'Content-Type': 'application/json;charset=UTF-8',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCompanyLocationList(data.documents);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Bearer 토큰
  const authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsLmNvbSIsInJvbGUiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcxOTgzMTYwMCwiZXhwIjozMzEzNDc0NTYwMH0.getDuds1kSPZ5SeiGtWukiq5qgLrKQiNnpZAX0f4-Ho';

  //직장 지역명, 위도, 경도 호출
  const companyLocationPut = async () => {
    const url = 'https://waither.shop/user/setting/region';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      regionName: selectedLocation,
      longtitude: selectedCompanyLocationsX,
      latitude: selectedCompanyLocationsY,
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      console.log(res, selectedLocation);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  //직장 지역 레포트 허용 여부 호출
  const companyReportPut = async () => {
    const url = 'https://waither.shop/user/setting/region-report';

    const headers = {
      Authorization: authorization,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      regionReport: isCompanyReportEnabled,
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log('Error fetching res:');
    }
  };

  // 현재 직장 지역 호출
  const presentCompanyLocationGet = async () => {
    const url = 'https://waither.shop/user/setting/region';
    const headers = {
      Authorization: authorization,
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();

      setUserPresentCompanyLocation(data.result.regionName);
      console.log(data.result.regionName);
    } catch (error) {
      console.log('Error fetching data: 현재 작장 지역 Get');
    }
  };

  presentCompanyLocationGet();

  //===============================================================

  useEffect(() => {
    if (
      selectedLocation &&
      selectedCompanyLocationsX &&
      selectedCompanyLocationsY
    ) {
      companyLocationPut();
      // presentCompanyLocationGet();
      // handleDismissModalPress();
    }
  }, [selectedLocation, selectedCompanyLocationsX, selectedCompanyLocationsY]);

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
          onTouchStart={companyReportPut}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>

      <GestureHandlerRootView style={{ flex: 1, width: USER_WIDTH }}>
        <BottomSheetModalProvider>
          <PresentCompanyLocationView>
            <PresentCompanyLocationSubTitle>
              현재 직장 지역 위치
            </PresentCompanyLocationSubTitle>
            <PresentCompanyLocationTitle>
              대한민국 {userPresentCompanyLocation}
            </PresentCompanyLocationTitle>
          </PresentCompanyLocationView>
          <CompanyLocationSettingView>
            <CompanyLocationSettingBtn onPress={handlePresentModalPress}>
              <CompanyLocationSettingInnerView>
                <SettingMainTitle>직장 지역 위치 설정</SettingMainTitle>
                <SettingSubTitle>
                  도시를 검색하여 직징 지역 위치를 설정할 수 있어요.
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
                <SearchedLocationTextInput
                  onChangeText={onChangeCompanyLocation}
                  onChange={companyLocationGet}
                  value={searchedLocation}
                ></SearchedLocationTextInput>
                <SearchCompanyCancleBtn onPress={handleDismissModalPress}>
                  <SearchCompanyText>취소</SearchCompanyText>
                </SearchCompanyCancleBtn>
              </SearchCompanyTextInputView>
              <CompanyLocationWrapper></CompanyLocationWrapper>
            </SearchCompanyView>
            <CompanyLocationWrapper>
              {companyLocationList.map((address) => (
                <CompanyLocationBtn
                  key={address.address_name}
                  onPress={() => {
                    onPressSelectedLocation(address.address_name);
                    onPressSelectCompanyLocationsX(address.x);
                    onPressSelectCompanyLocationsY(address.y);
                    setUserPresentCompanyLocation(address.address_name);
                    companyLocationPut();
                    handleDismissModalPress();
                  }}
                >
                  <CompanyLocationTitle>
                    {address.address_name}
                  </CompanyLocationTitle>
                </CompanyLocationBtn>
              ))}
            </CompanyLocationWrapper>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default CompanySetting;
