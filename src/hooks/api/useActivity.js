import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useActivity() {
  const token = useToken();
  const {
    data: activities,
    loading: activityLoading,
    error: activityError,
    act: getActivities,
  } = useAsync(() => activityApi.getActivity(token));

  return {
    activities,
    activityLoading,
    activityError,
    getActivities,
  };
}

export function useActivityDates() {
  const token = useToken();
  const {
    data: activityDates,
    loading: activityDatesLoading,
    error: activityDatesError,
    act: getActivitiyDates,
  } = useAsync(() => activityApi.getActivityDates(token));

  return {
    activityDates,
    activityDatesLoading,
    activityDatesError,
    getActivitiyDates,
  };
}

export function useActivitiesByDate(date) {
  const token = useToken();
  const {
    data: activities,
    loading: activityLoading,
    error: activityError,
    act: getActivities,
  } = useAsync(() => activityApi.getActivitiesByDate(token, date));

  return {
    activities,
    activityLoading,
    activityError,
    getActivities,
  };
}

export function useSubscribe() {
  const token = useToken();
  const {
    data: response,
    loading: subscribeLoading,
    error: subscribeError,
    act: subscribe,
  } = useAsync((activityId) => activityApi.subscribeToActivity(token, activityId), false);

  return {
    response,
    subscribeLoading,
    subscribeError,
    subscribe,
  };
}
