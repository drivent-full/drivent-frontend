import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useUpsertBooking() {
  const token = useToken();

  const {
    loading: upsertBookingLoading,
    error: upsertBookingError,
    act: upsertBooking,
  } = useAsync((data, bookingId) => bookingApi.upsert(data, bookingId, token), false);

  return {
    upsertBookingLoading,
    upsertBookingError,
    upsertBooking,
  };
}
