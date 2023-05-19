import useAsync from '../useAsync';
import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';

export default function useHotelWithRooms() {
  const token = useToken();
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotelWithRooms,
  } = useAsync((hotelId) => hotelApi.getHotelWithRooms(token, hotelId));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotelWithRooms
  };
}
