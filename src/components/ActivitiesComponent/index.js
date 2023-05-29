import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import { useActivityDates } from '../../hooks/api/useActivity';
import { useSubscribe } from '../../hooks/api/useActivity';
import DateSelectorComponent from './DateSelectorComponent';
import ActivitySelectorComponent from './ActivitySelectorComponent';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useTicket from '../../hooks/api/useTicket';
import NoPaymentFound from './NoPaymentFound';
import RemoteTicketSelected from './RemoteTicketSelected';

export default function ActivitiesComponent() {
  const { activityDates } = useActivityDates();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const { subscribe } = useSubscribe();
  const { getTicket } = useTicket();
  const [ticketStatus, setTicketStatus] = useState('');
  const [ticketIsRemote, setTicketIsRemote] = useState('');

  useEffect(async() => {
    try {
      const ticket = await getTicket();
      setTicketStatus(ticket.status);
      setTicketIsRemote(ticket.TicketType.isRemote);
      console.log(ticket);
      console.log(ticketIsRemote);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function selectDate(date) {
    setDates((prevState) => prevState.map((d) => (d === date ? { date: d.date, isSelected: true } : { date: d.date })));
    setSelectedDate(date);
  }

  async function onClickActivity(activity) {
    try {
      await subscribe(activity.id);
      toast('Inscrição realizada com sucesso');
    } catch (error) {
      const msg = error?.response?.data.message;
      toast('Problema ao realizar a inscrição:' + msg);
    }
  }

  useEffect(() => {
    setDates(activityDates);
  }, [activityDates]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      {ticketStatus !== 'PAID' ? (
        <NoPaymentFound />
      ) : ticketIsRemote ? (
        <RemoteTicketSelected />
      ): (
        <>
          <DateSelectorComponent dates={dates} setDate={selectDate} />
          {selectedDate && (
            <ActivitySelectorComponent key={selectedDate.date} date={selectedDate.date} onClickActivity={onClickActivity} />
          )}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
