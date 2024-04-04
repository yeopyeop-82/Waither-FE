import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { MAIN_COLOR } from '../styles/color';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const AskTitleWrapper = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const AskSubTitle = styled.Text`
  font-size: 23px;
  margin-bottom: 15px;
`;

const AskTitle = styled.Text`
  font-size: 30px;
`;

const Bold = styled.Text`
  font-weight: 800;
`;

const PickerWrapper = styled.View`
  flex-direction: row;
`;

const SubmitButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 50px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  border-radius: 40px;
  background-color: ${MAIN_COLOR};
  justify-content: center;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const AskNotificationTime = () => {
  const navigation = useNavigation();

  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('1');
  const [selectedMinute, setSelectedMinute] = useState('1');

  const AmPmOptions = [
    { label: '오전', value: 'AM' },
    { label: '오후', value: 'PM' },
  ];

  const hourOptions = Array.from({ length: 12 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  const handleSubmit = () => {
    navigation.navigate('AskOutro');
  };

  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskSubTitle>마지막 단계에요!</AskSubTitle>
        <AskTitle>
          <Bold>날씨 알림</Bold>을 받으실
        </AskTitle>
        <AskTitle>
          <Bold>시간대</Bold>를 설정해주세요.
        </AskTitle>
      </AskTitleWrapper>
      <PickerWrapper>
        <Picker
          style={{ width: 100 }}
          //   itemStyle={{ width: 100, height: 150 }}
          selectionColor={'rgba(81, 137, 246, 0.2)'}
          selectedValue={selectedAmPm}
          onValueChange={(itemValue, itemIndex) => setSelectedAmPm(itemValue)}
        >
          {AmPmOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={{ backgroundColor: 'tomato' }}
            />
          ))}
        </Picker>
        <Picker
          style={{ width: 100 }}
          //   itemStyle={{ width: 100, height: 150 }}
          selectionColor={'rgba(81, 137, 246, 0.2)'}
          selectedValue={selectedHour}
          onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
        >
          {hourOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={{ backgroundColor: 'tomato' }}
            />
          ))}
        </Picker>
        <Picker
          style={{ width: 100 }}
          //   itemStyle={{ width: 100, height: 150 }}
          selectionColor={'rgba(81, 137, 246, 0.2)'}
          selectedValue={selectedMinute}
          onValueChange={(itemValue, itemIndex) => setSelectedMinute(itemValue)}
        >
          {minuteOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={{ backgroundColor: 'tomato' }}
            />
          ))}
        </Picker>
      </PickerWrapper>
      <SubmitButtonWrapper>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>완료</SubmitButtonText>
        </SubmitButton>
      </SubmitButtonWrapper>
    </Wrapper>
  );
};

export default AskNotificationTime;
