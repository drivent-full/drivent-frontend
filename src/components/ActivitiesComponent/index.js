import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { useActivityDates } from '../../hooks/api/useActivity';
import { useSubscribe } from '../../hooks/api/useActivity';
import DateSelectorComponent from './DateSelectorComponent';
import ActivitySelectorComponent from './ActivitySelectorComponent';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ActivitiesComponent() {
  const { activityDates } = useActivityDates();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const { subscribe } = useSubscribe();

  function selectDate(date) {
    setDates((prevState) => prevState.map((d) => (d === date ? { date: d.date, isSelected: true } : { date: d.date })));
    setSelectedDate(date);
  }

  async function onClickActivity(activity) {
    try {
      await subscribe(activity.id);
      toast('Inscrição realizada com sucesso');
    } catch (error) {
      toast('Problema ao realizar a inscrição');
    }
  }

  useEffect(() => {
    setDates(activityDates);
  }, [activityDates]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      <DateSelectorComponent dates={dates} setDate={selectDate} />
      {selectedDate && (
        <ActivitySelectorComponent key={selectedDate.date} date={selectedDate.date} onClickActivity={onClickActivity} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
