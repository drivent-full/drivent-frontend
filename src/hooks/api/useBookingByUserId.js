import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useBookingByUserId() {
  const token = useToken();
  const {
    data: bookingByUserId,
    loading: bookingByUserIdLoading,
    error: bookingByUserIdError,
    act: getBookingByUserId,
  } = useAsync(() => bookingApi.getBookingByUserId(token));

  return {
    bookingByUserId,
    bookingByUserIdLoading,
    bookingByUserIdError,
    getBookingByUserId
  };
}
