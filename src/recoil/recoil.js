import { atom, selector } from 'recoil';

export const userNameState = atom({
  key: 'userNameState',
  default: '',
});
