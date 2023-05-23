import api from './api';
import dayjs from 'dayjs';

export async function getActivity(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivityDates(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivitiesByDate(token, date) {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const response = await api.get(`/activities?date="${dateStr}"`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
