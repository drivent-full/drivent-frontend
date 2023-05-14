import useAsync from '../useAsync';
import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';

export default function useHotel() {
  const token = useToken();
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel,
  } = useAsync(() => hotelApi.getHotel(token));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotel
  };
}
