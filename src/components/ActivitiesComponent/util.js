import dayjs from 'dayjs';
const daysOfWeek = {
  0: 'Domingo',
  1: 'Segunda',
  2: 'Terça',
  3: 'Quarta',
  4: 'Quinta',
  5: 'Sexta',
  6: 'Sábado',
};
export function formatDateButton(date) {
  const djs = dayjs(date);
  return `${daysOfWeek[date.getDay()]}, ${djs.format('DD/MM')}`;
}

const miliToHours = 1000 * 3600;
export function durationInHors(date1, date2) {
  const diff = dayjs(date2).diff(date1) / miliToHours;
  return diff;
}
