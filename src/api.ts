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

// const { isPending, error, data, isFetching } = useQuery({
//   queryKey: ['settingsData'],
//   queryFn: customServiceEnabledGet,
//   staleTime: Infinity,
// });
