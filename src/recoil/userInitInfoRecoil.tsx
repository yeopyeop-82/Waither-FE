import { atom } from 'recoil';

export const userFeelingTimeZoneState = atom({
  key: 'userFeelingTimeZoneState',
  default: 0,
});

export const userNotificationTimeState = atom({
  key: 'userNotificationTimeState',
  default: '',
});

export const userFeelingWeatherState = atom({
  key: 'userFeelingWeatherState',
  default: 'option1',
});

export const userNameState = atom({
  key: 'userNameState',
  default: '',
});
