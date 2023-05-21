import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';


export default function useSaveTicket() {
  const token = useToken();

  const {
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking,
  } = useAsync((data) => bookingApi.save(data, token), false);

  return {
    saveBookingLoading,
    saveBookingError,
    saveBooking,
  };
}