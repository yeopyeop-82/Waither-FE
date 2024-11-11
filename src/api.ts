export const BASE_URL = 'https://waither.shop';
import AsyncStorage from '@react-native-async-storage/async-storage';
const token = AsyncStorage.getItem('accessToken');
const accessToken = `Bearer ${token}`;

//레포트 호출
export const reportGet = async () => {
  const url = `${BASE_URL}/weather/report?latitude=37.5984434503798&longtitude=126.946053090715`;
  const headers = {
    Authorization: accessToken,
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      console.log(response.status);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error('Error fetching: 레포트 GET ', error);
  }
};

//메인화면 호출
export const mainWeatherGet = async () => {
  const url =
    'https://waither.shop/weather/main?latitude=37.5984434503798&longitude=126.946053090715';
  const token = await AsyncStorage.getItem('accessToken');
  const accessToken = 'Bearer ' + token;
  const headers = {
    Authorization: accessToken,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
    }
    const res = await response.json();
    console.log('메인화면 호출 결과', res);
    console.log('result', res.result);
    return res;
  } catch (error) {
    console.error('메인화면 호출 결과', error);
  }
};

// const { isPending, error, data, isFetching } = useQuery({
//   queryKey: ['settingsData'],
//   queryFn: customServiceEnabledGet,
//   staleTime: Infinity,
// });

//kakao REST API
//X 경도
//Y 위도
export const currentLocationGet = async () => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=126.946053090715&y=37.5984434503798&input_coord=WGS84`;

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
    const res = await response.json();
    return res;
  } catch (error) {
    console.error('Error fetching res:', error);
  }
};
