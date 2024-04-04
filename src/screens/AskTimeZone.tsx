import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { userWeatherState } from '../recoil/userWeather';
import { Picker } from '@react-native-picker/picker';
import { MAIN_COLOR } from '../styles/color';
import { useNavigation } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const AskTitleWrapper = styled.View`
  align-items: center;
`;

const AskTitle = styled.Text`
  font-size: 30px;
`;

const AskAmPmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 30px;
  margin-bottom: 5px;
`;

const AskAmPmButtonText = styled.Text`
  font-size: 15px;
  font-weight: 800;
`;

// eslint-disable-next-line react/prop-types
const AskAmPmRadioButton = ({ label, selected, onSelect }) => (
  <AskAmPmButton
    activeOpacity={1}
    onPress={onSelect}
    style={{ backgroundColor: selected ? `${MAIN_COLOR}` : '#e0e1e4' }}
  >
    <AskAmPmButtonText style={{ color: selected ? '#FFF' : '#9f9f9f' }}>
      {label}
    </AskAmPmButtonText>
  </AskAmPmButton>
);

const Bold = styled.Text`
  font-weight: 800;
`;

const SelectTimeWrapper = styled.View`
  flex: 0.3;
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text`
  font-size: 30px;
`;

const AmPmSelectButtonWrapper = styled.View`
  width: 25%;
  margin-right: 20px;
`;

const TimePickerWrapper = styled.View`
  width: 30%;
`;

const SubmitButtonWrapper = styled.View`
  width: 60%;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  border-radius: 30px;
  margin-bottom: 10px;
  background-color: ${MAIN_COLOR};
`;

const DontKnowSubmitButton = styled(SubmitButton)`
  background-color: #e0e1e4;
`;

const SubmitButtonText = styled(AskAmPmButtonText)`
  color: white;
`;

const DontKnowSubmitButtonText = styled(AskAmPmButtonText)`
  color: #9f9f9f;
`;

const AskTimeZone = () => {
  const navigation = useNavigation();
  const weather = useRecoilValue(userWeatherState);
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [selectedTime, setSelectedTime] = useState('1');

  const AmPmOptions = [
    { label: '오전', value: 'AM' },
    { label: '오후', value: 'PM' },
  ];

  const timeOptions = Array.from({ length: 12 }, (_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  const handleSubmit = () => {
    navigation.navigate('AskNotificationTime');
  };

  return (
    <Wrapper>
      <AskTitleWrapper>
        <AskTitle>
          {weather === 'option1' || weather === 'option2' ? (
            <Bold>춥다</Bold>
          ) : (
            <Bold>덥다</Bold>
          )}
          고 느낀
        </AskTitle>
        <AskTitle>
          <Bold>시간대</Bold>가 언제인가요 ?
        </AskTitle>
      </AskTitleWrapper>
      <SelectTimeWrapper>
        <AmPmSelectButtonWrapper>
          {AmPmOptions.map((option) => (
            <AskAmPmRadioButton
              key={option.value}
              label={option.label}
              selected={selectedAmPm === option.value}
              onSelect={() => setSelectedAmPm(option.value)}
            />
          ))}
        </AmPmSelectButtonWrapper>
        <Picker
          style={{ width: 100, height: 45 }}
          itemStyle={{ height: 45 }}
          selectionColor="rgba(81, 137, 246, 0.2)"
          selectedValue={selectedTime}
          onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
        >
          {timeOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
        <TimeText>시</TimeText>
      </SelectTimeWrapper>
      <SubmitButtonWrapper>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>확인</SubmitButtonText>
        </SubmitButton>
        <DontKnowSubmitButton>
          <DontKnowSubmitButtonText>잘 모르겠어요</DontKnowSubmitButtonText>
        </DontKnowSubmitButton>
      </SubmitButtonWrapper>
    </Wrapper>
  );
};

export default AskTimeZone;
